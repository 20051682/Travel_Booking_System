from pydantic import BaseModel

class Package(BaseModel):
    name: str
    hotel_name: str
    place_from: str
    room_size: int
    start_date: str
    end_date: str
    price: float

