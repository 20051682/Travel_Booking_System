from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    number: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[EmailStr]
    number: Optional[str]
    password: Optional[str]
    role: Optional[str]
