from pydantic import BaseModel, EmailStr

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
