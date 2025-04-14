from pydantic import BaseModel
from typing import Optional

class Booking(BaseModel):
    user_id: str
    username: str
    email: str
    location_from: str
    location_to: str
    start_date: str
    end_date: Optional[str] = None
    passengers: int
    trip_type: str
    mode: str
    distance_km: Optional[str] = None
    duration_min: Optional[str] = None
    total_price: Optional[float] = None
    payment_status: str = "pending"
    booking_status: str = "pending"
    status: str = "Approved"

