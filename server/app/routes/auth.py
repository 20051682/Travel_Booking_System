from fastapi import APIRouter
from app.controllers.authController import register_user, login_user
from app.models.userModel import UserRegister, UserLogin

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    return register_user(user)

@router.post("/login")
def login(user: UserLogin):
    return login_user(user)
