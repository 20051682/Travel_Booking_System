from fastapi import APIRouter
from app.controllers.authController import (
    register_user, login_user, get_all_users,
    get_user_by_id, update_user, delete_user
)
from app.models.userModel import UserRegister, UserLogin, UserUpdate

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    return register_user(user)

@router.post("/login")
def login(user: UserLogin):
    return login_user(user)

@router.get("/users")
def get_users():
    return get_all_users()

@router.get("/users/{user_id}")
def get_user(user_id: str):
    return get_user_by_id(user_id)

@router.put("/users/{user_id}")
def update(user_id: str, user: UserUpdate):
    return update_user(user_id, user)

@router.delete("/users/{user_id}")
def delete(user_id: str):
    return delete_user(user_id)
