from fastapi import FastAPI
from app.routes import bookings

app = FastAPI()

app.include_router(bookings.router)

@app.get("/")
def read_root():
    return {"message": "Travel Booking API"}
