from fastapi import APIRouter
from app.models.bookingModel import Booking
from app.controllers.bookingController import create_booking

router = APIRouter()

@router.post("/bookings")
def add_booking(booking: Booking):
    return create_booking(booking)
