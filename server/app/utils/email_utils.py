import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_payment_email(to_email, booking_data):
    subject = "Payment Confirmation"
    body = "This is a simple test email to check if sending works."

    # Ensure the body is in Unicode format (handle both ASCII and non-ASCII chars)
    body = str(body)  # Ensure body is a string, not bytes

    # Print the body to check for any hidden characters
    print(repr(body))  # Debugging line to check the raw content of the body

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject

    # Attach the body to the email (ensuring it’s properly handled as UTF-8)
    msg.attach(MIMEText(body, "plain", _charset="utf-8"))

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print("✅ Payment email sent.")
    except Exception as e:
        print(f"❌ Failed to send payment email: {e}")

# Test sending a simple email
# send_payment_email("hiroshkoshila7ire@gmail.com", {})
