# app/routes/destinationRoutes.py
from fastapi import APIRouter
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
def add_hotel(hotel: Hotel):
    return create_hotel(hotel)

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
def modify_hotel(hotel_id: str, hotel: Hotel):
    return update_hotel(hotel_id, hotel)

# Delete a hotel by ID
@router.delete("/hotel/{hotel_id}")
def remove_hotel(hotel_id: str):
    return delete_hotel(hotel_id)
