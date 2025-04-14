# app/routes/destinationRoutes.py
from fastapi import APIRouter, File, UploadFile, Form
from app.models.packageModel import Package
from app.controllers.packageController import (
    create_package,
    get_packages,
    get_package_by_id,
    update_package,
    delete_package
)

router = APIRouter()

# Create a package
@router.post("/package")
async def add_package(
    name: str = Form(...),
    hotel_name: str = Form(...),
    place_from: str = Form(...),
    place_to: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),
    price: float = Form(...),
    room_type: str = Form(...),
    image_file: UploadFile = File(None)
):
    package = Package(
        name=name,
        hotel_name=hotel_name,
        place_from=place_from,
        place_to=place_to,
        start_date=start_date,
        end_date=end_date,
        price=price,
        room_type=room_type
    )
    return create_package(package, image_file)

# Read all packages
@router.get("/packages")
def list_packages():
    return get_packages()

# Read a package by ID
@router.get("/package/{package_id}")
def get_package(package_id: str):
    return get_package_by_id(package_id)

# Update a hotpackageel by ID
@router.put("/package/{package_id}")
async def modify_package(
    package_id: str,
    name: str = Form(...),
    description: str = Form(...),
    price_per_single_room: float = Form(...),
    price_per_double_room: float = Form(...),
    price_per_large_room: float = Form(...),
    location: str = Form(...),
    image_file: UploadFile = File(None)
):
    package = Package(
        name=name,
        description=description,
        price_per_single_room=price_per_single_room,
        price_per_double_room=price_per_double_room,
        price_per_large_room=price_per_large_room,
        location=location,
    )
    return update_package(package_id, package, image_file)

# Delete a package by ID
@router.delete("/package/{package_id}")
def remove_package(package_id: str):
    return delete_package(package_id)
