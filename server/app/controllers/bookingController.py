import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv
from app.models.bookingModel import Booking
from app.database.mongodb import db
from bson.objectid import ObjectId

load_dotenv()

ORS_API_KEY = os.getenv("ORS_API_KEY")
GEOCODE_URL = "https://api.openrouteservice.org/geocode/search"
MATRIX_URL = "https://api.openrouteservice.org/v2/matrix/driving-car"


async def geocode_location(place: str) -> list:
    async with httpx.AsyncClient() as client:
        params = {"api_key": ORS_API_KEY, "text": place, "size": 1}
        response = await client.get(GEOCODE_URL, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Geocoding failed for {place}")
        coords = response.json()["features"][0]["geometry"]["coordinates"]
        return coords


async def create_booking(booking: Booking, mode: str = "car"):
    from_coords = await geocode_location(booking.location_from)
    to_coords = await geocode_location(booking.location_to)

    payload = {
        "locations": [from_coords, to_coords],
        "metrics": ["distance", "duration"]
    }
    headers = {"Authorization": ORS_API_KEY, "Content-Type": "application/json"}

    async with httpx.AsyncClient() as client:
        response = await client.post(MATRIX_URL, json=payload, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Distance matrix request failed")
        data = response.json()

    distance_km = round(data["distances"][0][1] / 1000, 2)
    duration_min = round(data["durations"][0][1] / 60, 2)

    price_per_km = 0.10 if mode == "car" else 0.05
    total_price = round(distance_km * price_per_km * booking.passengers, 2)

    if booking.trip_type == "round":
        total_price *= 2  # Double the price for round trips

    booking_dict = booking.dict()
    booking_dict.update({
        "mode": mode,
        "distance_km": distance_km,
        "duration_min": duration_min,
        "total_price": total_price,
        "status": "pending"  # Default status to 'pending' until approved
    })

    result = db.booking.insert_one(booking_dict)
    return {
        "message": "Booking successful",
        "booking_id": str(result.inserted_id),
        "price": total_price
    }


def get_all_bookings():
    return [dict(item, _id=str(item["_id"])) for item in db.booking.find()]


def get_booking_by_id(booking_id: str):
    booking = db.booking.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking["_id"] = str(booking["_id"])
    return booking


def update_booking(booking_id: str, updated_data: dict):
    result = db.booking.update_one({"_id": ObjectId(booking_id), "status": "pending"},
                                   {"$set": updated_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found or already processed")
    return {"message": "Booking updated successfully"}


def reject_booking_update(booking_id: str, reason: str = "No reason provided"):
    result = db.booking.update_one(
        {"_id": ObjectId(booking_id), "status": "update_pending"},
        {"$set": {"status": "rejected", "rejection_reason": reason}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Pending update not found or already processed")
    return {"message": "Booking update rejected", "reason": reason}


def approve_booking_update(booking_id: str):
    result = db.booking.update_one(
        {"_id": ObjectId(booking_id), "status": "update_pending"},
        {"$set": {"status": "approved"}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Pending update not found or already processed")
    return {"message": "Booking update approved"}
    
def delete_booking(booking_id: str):
    result = db.booking.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted successfully"}
