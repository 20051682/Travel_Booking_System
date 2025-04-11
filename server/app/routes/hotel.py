# app/routes/destinationRoutes.py
from fastapi import APIRouter, File, UploadFile, Form
from app.models.hotelModel import Hotel
from app.controllers.hotelController import (
    create_hotel,
    get_hotels,
    get_hotel_by_id,
    update_hotel,
    delete_hotel
)

router = APIRouter()

# Create a hotel
@router.post("/hotel")
async def add_hotel(
    name: str = Form(...),
    description: str = Form(...),
    price_per_single_room: float = Form(...),
    price_per_double_room: float = Form(...),
    price_per_large_room: float = Form(...),
    location: str = Form(...),
    image_file: UploadFile = File(None)
):
    hotel = Hotel(
        name=name,
        description=description,
        price_per_single_room=price_per_single_room,
        price_per_double_room=price_per_double_room,
        price_per_large_room=price_per_large_room,
        location=location,
    )
    return create_hotel(hotel, image_file)

# Read all hotels
@router.get("/hotels")
def list_hotels():
    return get_hotels()

# Read a hotel by ID
@router.get("/hotel/{hotel_id}")
def get_hotel(hotel_id: str):
    return get_hotel_by_id(hotel_id)

# Update a hotel by ID
@router.put("/hotel/{hotel_id}")
async def modify_hotel(
    hotel_id: str,
    name: str = Form(...),
    description: str = Form(...),
    price_per_single_room: float = Form(...),
    price_per_double_room: float = Form(...),
    price_per_large_room: float = Form(...),
    location: str = Form(...),
    image_file: UploadFile = File(None)
):
    hotel = Hotel(
        name=name,
        description=description,
        price_per_single_room=price_per_single_room,
        price_per_double_room=price_per_double_room,
        price_per_large_room=price_per_large_room,
        location=location,
    )
    return update_hotel(hotel_id, hotel, image_file)

# Delete a hotel by ID
@router.delete("/hotel/{hotel_id}")
def remove_hotel(hotel_id: str):
    return delete_hotel(hotel_id)
