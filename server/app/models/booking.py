from pydantic import BaseModel

class Booking(BaseModel):
    name: str
    destination: str
    date: str
    seats: int

