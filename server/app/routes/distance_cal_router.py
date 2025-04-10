from fastapi import APIRouter, HTTPException, Request
from app.controllers.distance_controller import calculate_distance_price  # Assuming the controller is in a separate file

router = APIRouter()

@router.post("/calculate-distance")
async def calculate_distance(request: Request):
    data = await request.json()
    from_place = data.get("from")
    to_place = data.get("to")
    mode = data.get("mode", "car")  # Default mode is 'car' if not provided

    if not from_place or not to_place:
        raise HTTPException(status_code=400, detail="Both 'from' and 'to' locations are required.")

    # Calculate the price based on the mode
    result = await calculate_distance_price(from_place, to_place, mode)

    return result
