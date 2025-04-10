from pymongo import MongoClient
from dotenv import load_dotenv
import os

print("🔄 Loading environment variables...")
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB_NAME")

print(f"🔍 MONGO_URI: {MONGO_URI}")
print(f"🔍 DB_NAME: {DB_NAME}")

if not MONGO_URI or not DB_NAME:
    print("❌ Missing environment variables. Check .env file.")
    exit(1)

try:
    print("🔌 Connecting to MongoDB...")
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=30000)
    db = client[DB_NAME]
    
    # Trigger a connection attempt
    client.admin.command("ping")
    print("✅ Successfully connected to MongoDB")

except Exception as e:
    print(f"❌ Connection failed: {e}")
