import json
from datetime import datetime, date, time, timedelta
from database.database import  get_db_connection
from decimal import Decimal

def convert_to_json_compatible(data):
    if isinstance(data, dict):
        return {k: convert_to_json_compatible(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_to_json_compatible(item) for item in data]
    elif isinstance(data, (datetime, date, time)):
        return data.isoformat()
    elif isinstance(data, timedelta):  
        return str(data)
    elif isinstance(data, Decimal):  # Handle Decimal type
        return float(data)
    elif isinstance(data, (int, float, str)):  # Basic types
        return data
    


