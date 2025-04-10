from app.models.destinationModel import Destination
from app.database.mongodb import db
from bson import ObjectId

def create_destination(destination: Destination):
    dest_dict = destination.dict()
    result = db.destination.insert_one(dest_dict)
    return {
        "message": "Destination added successfully",
        "destination": {
            "id": str(result.inserted_id),
            "name": destination.name
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

def update_destination(dest_id: str, destination: Destination):
    updated = db.destination.update_one(
        {"_id": ObjectId(dest_id)},
        {"$set": destination.dict()}
    )
    if updated.modified_count:
        return {"message": "Destination updated successfully"}
    return {"message": "No changes made or destination not found"}

def delete_destination(dest_id: str):
    deleted = db.destination.delete_one({"_id": ObjectId(dest_id)})
    if deleted.deleted_count:
        return {"message": "Destination deleted successfully"}
    return {"error": "Destination not found"}
