from fastapi import APIRouter
from app.database import db

router = APIRouter()

@router.get("/bookings")
def get_bookings():
    bookings = list(db["bookings"].find({}, {"_id": 0}))
    return bookings
