from pydantic import BaseModel
from typing import Optional

class Destination(BaseModel):
    name: str
    description: str
    url: str
    image_url: Optional[str] = None
    web_description: Optional[str] = None

