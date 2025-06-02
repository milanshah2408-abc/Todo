from flask import Blueprint,request, jsonify, make_response
from utils.validation import validate_and_process_request
from src.schema.todo_schema import *
from src.services.todo_service import *
from src.models.todo_model import *
todo_routes_bp = Blueprint('todo_routes_bp', __name__)

@todo_routes_bp.route('/getTodos', methods=['GET'])
def getTodos():
    return getTodosService()

@todo_routes_bp.route('/getTodoByID', methods=['POST'])
def get_family_heads_route():
    return validate_and_process_request(request.json,todo_route_schema_request,getTodoByIDSchema,getTodoByIDService)

@todo_routes_bp.route('/addTodo', methods=['POST'])
def addTodo():
    return validate_and_process_request(
        request.json,todo_route_schema_request,addTodoSchema,addTodoService)
    
@todo_routes_bp.route('/updateTodo', methods=['PUT'])
def updateTodo():
    return validate_and_process_request(request.json,todo_route_schema_request,updateTodoSchema,updateTodoService)

@todo_routes_bp.route('/deleteTodo', methods=['DELETE'])
def deleteTodo():
    return validate_and_process_request(request.json,todo_route_schema_request,deleteTodoSchema,deleteTodoService)

@todo_routes_bp.route('/updateStatus', methods=['PUT'])
def updateStatus():
    return validate_and_process_request(request.json,todo_route_schema_request,updateStatusSchema,updateStatusService)

