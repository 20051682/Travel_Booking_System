from app.models.destinationModel import Destination
from app.database.mongodb import db
from bson import ObjectId
from typing import Optional
from fastapi import HTTPException, UploadFile
from firebase_admin import storage
from app.firebase import firebase_config

def upload_image_to_firebase(image_file: UploadFile):
    file_name = f"destinations/{image_file.filename}"

    bucket = storage.bucket()
    blob = bucket.blob(file_name)
    blob.upload_from_file(image_file.file, content_type=image_file.content_type)
    blob.make_public()

    return blob.public_url

def create_destination(destination: Destination, image_file: Optional[UploadFile] = None):
    destination_dict = destination.dict()

    if image_file:
        try:
            image_url = upload_image_to_firebase(image_file)
            destination_dict["image_url"] = image_url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    result = db.destination.insert_one(destination_dict)
    return {
        "message": "Destination added successfully",
        "destination": {
            "id": str(result.inserted_id),
            "name": destination.name,
            "image_url": destination_dict.get("image_url")
        }
    }

def get_destinations():
    destinations = []
    for dest in db.destination.find():
        dest['_id'] = str(dest['_id'])
        destinations.append(dest)
    return destinations

def get_destination_by_id(dest_id: str):
    dest = db.destination.find_one({"_id": ObjectId(dest_id)})
    if dest:
        dest['_id'] = str(dest['_id'])
        return dest
    return {"error": "Destination not found"}

def update_destination(dest_id: str, destination: Destination, image_file: Optional[UploadFile] = None):
    destination_dict = destination.dict()

    if image_file:
        try:
            image_url = upload_image_to_firebase(image_file)
            destination_dict["image_url"] = image_url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    updated = db.destination.update_one(
        {"_id": ObjectId(dest_id)},
        {"$set": destination_dict}
    )

    if updated.modified_count:
        return {"message": "Destination updated successfully"}
    return {"message": "No changes made or destination not found"}

def delete_destination(dest_id: str):
    deleted = db.destination.delete_one({"_id": ObjectId(dest_id)})
    if deleted.deleted_count:
        return {"message": "Destination deleted successfully"}
    return {"error": "Destination not found"}
