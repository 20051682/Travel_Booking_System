from app.models.bookingModel import Booking
from app.database.mongodb import db

def create_booking(booking: Booking):
    booking_dict = booking.dict()
    result = db.booking.insert_one(booking_dict)
    return {"inserted_id": str(result.inserted_id)}
