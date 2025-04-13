from fastapi import APIRouter, Body
from app.models.bookingModel import Booking
from app.controllers.bookingController import create_booking, get_all_bookings,get_booking_by_id, update_booking, reject_booking_update, approve_booking_update, delete_booking, get_bookings_by_user

router = APIRouter()

@router.post("/booking")
async def add_booking(booking: Booking):
    return await create_booking(booking)

@router.get("/bookings")
def list_all_bookings():
    return get_all_bookings()

@router.get("/booking/{booking_id}")
def get_booking(booking_id: str):
    return get_booking_by_id(booking_id)

@router.put("/booking/{booking_id}")
def update_booking_details(booking_id: str, updated_data: dict):
    return update_booking(booking_id, updated_data)

@router.put("/booking/approve/{booking_id}")
def approve_update(booking_id: str):
    return approve_booking_update(booking_id)

@router.put("/booking/reject/{booking_id}")
def reject_update(booking_id: str, reason: str = Body("No reason provided")):
    return reject_booking_update(booking_id, reason)

@router.delete("/booking/{booking_id}")
def delete_booking_record(booking_id: str):
    return delete_booking(booking_id)

@router.get("/bookings/user/{user_id}")
def get_bookings_for_user(user_id: str):
    return get_bookings_by_user(user_id)

