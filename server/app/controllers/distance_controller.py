import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

ORS_API_KEY = os.getenv("ORS_API_KEY")
GEOCODE_URL = "https://api.openrouteservice.org/geocode/search"
MATRIX_URL = "https://api.openrouteservice.org/v2/matrix/driving-car"

async def geocode_location(place: str) -> list:
    async with httpx.AsyncClient() as client:
        params = {"api_key": ORS_API_KEY, "text": place, "size": 1}
        response = await client.get(GEOCODE_URL, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Geocoding failed for {place}")
        data = response.json()
        coords = data["features"][0]["geometry"]["coordinates"]
        return coords  # Format: [lon, lat]

async def calculate_distance_price(from_place: str, to_place: str, mode: str = "car") -> dict:
    from_coords = await geocode_location(from_place)
    to_coords = await geocode_location(to_place)

    matrix_payload = {
        "locations": [from_coords, to_coords],
        "metrics": ["distance", "duration"]
    }

    headers = {"Authorization": ORS_API_KEY, "Content-Type": "application/json"}

    async with httpx.AsyncClient() as client:
        response = await client.post(MATRIX_URL, json=matrix_payload, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to get distance matrix")

        matrix_data = response.json()
        distance_m = matrix_data["distances"][0][1]
        duration_s = matrix_data["durations"][0][1]

        distance_km = distance_m / 1000
        duration_min = duration_s / 60

        # Define pricing for car and bus
        if mode == "car":
            price_per_km = 0.10  # Price per km for car
        elif mode == "bus":
            price_per_km = 0.05  # Price per km for bus (lower than car)
        else:
            raise HTTPException(status_code=400, detail="Invalid mode. Use 'car' or 'bus'.")

        price = round(distance_km * price_per_km, 2)

        return {
            "from": from_place,
            "to": to_place,
            "distance_km": round(distance_km, 2),
            "duration_min": round(duration_min, 2),
            "price": price,
            "mode": mode
        }
