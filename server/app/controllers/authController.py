from fastapi import HTTPException
from app.database.mongodb import db
from app.utils.auth import hash_password, verify_password, create_access_token
from app.models.userModel import UserRegister, UserLogin

def register_user(user: UserRegister):
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    db.users.insert_one(user_dict)

    return {"message": "User registered successfully", "user": {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }}

def login_user(user: UserLogin):
    db_user = db.users.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token({
        "sub": db_user["email"],
        "role": db_user["role"]
    })

    return {"access_token": token, "token_type": "bearer"}
