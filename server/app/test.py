from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Debugging: Print out the values of the environment variables
print("MONGO_URI:", os.getenv("MONGO_URI"))
print("MONGO_DB_NAME:", os.getenv("MONGO_DB_NAME"))

# Ensure that the environment variables are not None
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

if not MONGO_URI or not MONGO_DB_NAME:
    print("❌ Missing MongoDB URI or Database Name in environment variables.")
else:
    # Create a MongoClient and connect to MongoDB
    client = MongoClient(MONGO_URI)

    # Access the database
    db = client[MONGO_DB_NAME]
    collection = db['bookings']  # Use the appropriate collection

    # Data to insert (you can replace this with dynamic data)
    name = "John Doe"
    destination = "Paris"
    email = "johndoe@example.com"

    # Document to insert
    document = {
        "name": name,
        "destination": destination,
        "email": email
    }

    try:
        # Ping the MongoDB server to check connection
        client.admin.command("ping")
        print("✅ Connected to MongoDB")

        # Insert the document into the collection
        result = collection.insert_one(document)
        print("✅ Document inserted with _id:", result.inserted_id)

    except Exception as e:
        print("❌ Connection failed:", e)
