import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate('app/firebase/travel-booking-system-e9a0c-firebase-adminsdk-fbsvc-1a58a92925.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'travel-booking-system-e9a0c.firebasestorage.app'
    })
