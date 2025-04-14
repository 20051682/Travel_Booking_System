from pydantic import BaseModel
from typing import Optional

class Package(BaseModel):
    name: str
    hotel_name: str
    place_from: str
    place_to: str
    room_type: str
    start_date: str
    end_date: str
    price: float
    image_url: Optional[str] = None


