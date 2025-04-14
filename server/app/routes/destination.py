# app/routes/destinationRoutes.py
from fastapi import APIRouter, File, UploadFile, Form
from app.models.destinationModel import Destination
from app.controllers.destinationController import (
    create_destination,
    get_destinations,
    get_destination_by_id,
    update_destination,
    delete_destination
)

router = APIRouter()

# Create a destination
@router.post("/destination")
async def add_destination(
    name: str = Form(...),
    description: str = Form(...),
    url: str = Form(...),
    image_file: UploadFile = File(None)
):
    destination = Destination(
        name=name,
        description=description,
        url=url,
    )
    return create_destination(destination, image_file)

# Read all destinations
@router.get("/destinations")
def list_destinations():
    return get_destinations()

# Read a destination by ID
@router.get("/destination/{destination_id}")
def get_destination(destination_id: str):
    return get_destination_by_id(destination_id)

# Update a destination by ID
@router.put("/destination/{destination_id}")
async def modify_destination(
    destination_id: str,
    name: str = Form(...),
    description: str = Form(...),
    url: str = Form(...),
    image_file: UploadFile = File(None)
):
    destination = Destination(
        name=name,
        description=description,
        url=url,
    )
    return update_destination(destination_id, destination, image_file)

# Delete a destination by ID
@router.delete("/destination/{destination_id}")
def remove_destination(destination_id: str):
    return delete_destination(destination_id)
