from app.models.hotelModel import Hotel
from app.database.mongodb import db
from bson import ObjectId
from typing import Optional
from fastapi import HTTPException, UploadFile
from firebase_admin import storage
from app.firebase import firebase_config

def upload_image_to_firebase(image_file: UploadFile):
    file_name = f"hotels/{image_file.filename}"

    bucket = storage.bucket()
    blob = bucket.blob(file_name)
    blob.upload_from_file(image_file.file, content_type=image_file.content_type)
    blob.make_public()

    return blob.public_url

def create_hotel(hotel: Hotel, image_file: Optional[UploadFile] = None):
    hotel_dict = hotel.dict()

    if image_file:
        try:
            image_url = upload_image_to_firebase(image_file)
            hotel_dict["image_url"] = image_url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    result = db.hotels.insert_one(hotel_dict)
    return {
        "message": "Hotel added successfully",
        "hotel": {
            "id": str(result.inserted_id),
            "name": hotel.name,
            "image_url": hotel_dict.get("image_url")
        }
    }

def get_hotels():
    hotels = []
    for hot in db.hotels.find():
        hot['_id'] = str(hot['_id'])
        hotels.append(hot)
    return hotels

def get_hotel_by_id(hotel_id: str):
    hot = db.hotels.find_one({"_id": ObjectId(hotel_id)})
    if hot:
        hot['_id'] = str(hot['_id'])
        return hot
    return {"error": "Hotel not found"}

def update_hotel(hotel_id: str, hotel: Hotel):
    updated = db.hotels.update_one(
        {"_id": ObjectId(hotel_id)},
        {"$set": hotel.dict()}
    )
    if updated.modified_count:
        return {"message": "Hotel updated successfully"}
    return {"message": "No changes made or hotel not found"}

def delete_hotel(hotel_id: str):
    deleted = db.hotels.delete_one({"_id": ObjectId(hotel_id)})
    if deleted.deleted_count:
        return {"message": "Hotel deleted successfully"}
    return {"error": "Hotel not found"}
