# Travel_Booking_System

# Setup server side

python -m venv venv

have to create .gitignore file inside the venv folder

venv\Scripts\activate
pip install -r requirements.txt
pip install passlib[bcrypt]
pip install python-jose
pip install pydantic[email]
pip install firebase-admin
pip install python-multipart
pip install beautifulsoup4 requests
pip install pytest httpx pytest-asyncio

run the server

uvicorn app.main:app --reload


