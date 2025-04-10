from pydantic import BaseModel

class Booking(BaseModel):
    name: str
    email: str
    location_from: str
    location_to: str
    start_date: str
    end_date: str
    trip_: str
    passengers: str
