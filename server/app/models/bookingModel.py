from pydantic import BaseModel
from typing import Optional

class Booking(BaseModel):
    user_id: str
    location_from: str
    location_to: str
    start_date: str
    end_date: Optional[str] = None
    passengers: int
    trip_type: str  # should be 'oneway' or 'round'
