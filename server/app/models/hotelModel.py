from pydantic import BaseModel

class Hotel(BaseModel):
    name: str
    price_per_single_room: float
    price_per_double_room: float
    price_per_large_room: float
    start_date: str
    end_date: str
    location: str

