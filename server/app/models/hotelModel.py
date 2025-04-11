from pydantic import BaseModel
from typing import Optional

class Hotel(BaseModel):
    name: str
    description: str
    price_per_single_room: float
    price_per_double_room: float
    price_per_large_room: float
    location: str
    image_url: Optional[str] = None
