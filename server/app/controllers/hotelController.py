from app.models.hotelModel import Hotel
from app.database.mongodb import db
from bson import ObjectId

def create_hotel(hotel: Hotel):
    dest_dict = hotel.dict()
    result = db.hotels.insert_one(dest_dict)
    return {
        "message": "Hotel added successfully",
        "hotel": {
            "id": str(result.inserted_id),
            "name": hotel.name
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
