from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, bookings

app = FastAPI()

# Allow all origins for development purposes (you can restrict this in production)
origins = [
    "http://localhost:3000",  # React app origin
    "http://127.0.0.1:3000",  # React app origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router)
app.include_router(bookings.router)

