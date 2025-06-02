# src/utils/validation.py
from flask import request, jsonify
from src.schema.todo_schema import todo_route_schema_request
def validate_and_process_request(data,schema_function,schema_name,service_function):
    errors = schema_function(data,schema_name)
    if errors:
        return jsonify({
            "status": "failed",
            "error": "Invalid request data. Please review request and try again.",
            "details": errors
        }), 422
    return service_function(request.json)
