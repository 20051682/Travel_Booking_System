from fastapi import HTTPException
from bson import ObjectId
from app.database.mongodb import db
from app.utils.auth import hash_password, verify_password, create_access_token
from app.models.userModel import UserRegister, UserLogin, UserUpdate

def register_user(user: UserRegister):
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    result = db.users.insert_one(user_dict)

    return {
        "message": "User registered successfully",
        "user": {
            "id": str(result.inserted_id),
            "username": user.first_name + " " + user.last_name,
            "number": user.number,
            "email": user.email,
            "role": user.role
        }
    }

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

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user["role"],
        "user_info": {
            "id": str(db_user["_id"]),
            "first_name": db_user["first_name"],
            "last_name": db_user["first_name"],
            "email": db_user["email"],
            "password": db_user["password"],
            "number": db_user["number"],
            "email": db_user["email"],
            "role": db_user["role"]

        }
    }

def get_all_users():
    users = []
    for user in db.users.find():
        user["_id"] = str(user["_id"])
        user["password"] = "hidden"
        users.append(user)
    return users

def get_user_by_id(user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    user["password"] = "hidden"
    return user

def update_user(user_id: str, update_data: UserUpdate):
    update_dict = update_data.dict(exclude_unset=True)
    if "password" in update_dict:
        update_dict["password"] = hash_password(update_dict["password"])
    result = db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_dict})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or no changes made")
    return {"message": "User updated successfully"}

def delete_user(user_id: str):
    result = db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
