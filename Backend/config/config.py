import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

# Constants for API configuration
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
DB_PORT = os.getenv('DB_PORT')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
