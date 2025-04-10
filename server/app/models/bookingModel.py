from pydantic import BaseModel

class Booking(BaseModel):
    name: str
    email: str
    destination: str
    date: str
