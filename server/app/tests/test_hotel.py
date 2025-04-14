import pytest
from httpx import AsyncClient
from app.main import app

# Sample data to use
sample_hotel = {
    "name": "Test Hotel",
    "description": "A beautiful hotel for testing.",
    "price_per_single_room": 50.0,
    "price_per_double_room": 90.0,
    "price_per_large_room": 130.0,
    "location": "Test City"
}

@pytest.mark.asyncio
async def test_create_hotel():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/hotel", data=sample_hotel)
    assert response.status_code == 200
    result = response.json()
    assert "hotel" in result
    assert result["hotel"]["name"] == sample_hotel["name"]
    global hotel_id
    hotel_id = result["hotel"]["id"]  # Save for future tests


@pytest.mark.asyncio
async def test_get_all_hotels():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/hotels")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_hotel_by_id():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/hotel/{hotel_id}")
    assert response.status_code == 200
    result = response.json()
    assert result["name"] == sample_hotel["name"]


@pytest.mark.asyncio
async def test_update_hotel():
    updated_data = sample_hotel.copy()
    updated_data["name"] = "Updated Test Hotel"
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.put(f"/hotel/{hotel_id}", data=updated_data)
    assert response.status_code == 200
    assert response.json()["message"] in ["Hotel updated successfully", "No changes made or hotel not found"]


@pytest.mark.asyncio
async def test_delete_hotel():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.delete(f"/hotel/{hotel_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Hotel deleted successfully"


@pytest.mark.asyncio
async def test_get_non_existent_hotel():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/hotel/000000000000000000000000")  # Invalid ObjectId
    assert response.status_code == 200
    assert response.json()["error"] == "Hotel not found"


@pytest.mark.asyncio
async def test_delete_non_existent_hotel():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.delete("/hotel/000000000000000000000000")
    assert response.status_code == 200
    assert response.json()["error"] == "Hotel not found"
