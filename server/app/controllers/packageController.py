from app.models.packageModel import Package
from app.database.mongodb import db
from bson import ObjectId
from typing import Optional
from fastapi import HTTPException, UploadFile
from firebase_admin import storage
from app.firebase import firebase_config

def upload_image_to_firebase(image_file: UploadFile):
    file_name = f"packages/{image_file.filename}"

    bucket = storage.bucket()
    blob = bucket.blob(file_name)
    blob.upload_from_file(image_file.file, content_type=image_file.content_type)
    blob.make_public()

    return blob.public_url

def create_package(package: Package, image_file: Optional[UploadFile] = None):
    package_dict = package.dict()

    if image_file:
        try:
            image_url = upload_image_to_firebase(image_file)
            package_dict["image_url"] = image_url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    result = db.packages.insert_one(package_dict)
    return {
        "message": "Package added successfully",
        "package": {
            "id": str(result.inserted_id),
            "name": package.name,
            "image_url": package_dict.get("image_url")
        }
    }

def get_packages():
    packages = []
    for pack in db.packages.find():
        pack['_id'] = str(pack['_id'])
        packages.append(pack)
    return packages

def get_package_by_id(package_id: str):
    pack = db.packages.find_one({"_id": ObjectId(package_id)})
    if pack:
        pack['_id'] = str(pack['_id'])
        return pack
    return {"error": "Package not found"}

def update_package(package_id: str, package: Package, image_file: Optional[UploadFile] = None):
    package_dict = package.dict()

    if image_file:
        try:
            image_url = upload_image_to_firebase(image_file)
            package_dict["image_url"] = image_url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    updated = db.packages.update_one(
        {"_id": ObjectId(package_id)},
        {"$set": package_dict}
    )

    if updated.modified_count:
        return {"message": "Package updated successfully"}
    return {"message": "No changes made or package not found"}


def delete_package(package_id: str):
    deleted = db.packages.delete_one({"_id": ObjectId(package_id)})
    if deleted.deleted_count:
        return {"message": "Package deleted successfully"}
    return {"error": "Package not found"}
