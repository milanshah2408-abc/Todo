from flask import jsonify
from utils.utils import convert_to_json_compatible
from src.models.todo_model import *

def getTodosService():
    return convert_to_json_compatible(Todo.getTodoModel())

def getTodoByIDService(todo_id):
    try:
        Todos= Todo.getTodoById ()
        return convert_to_json_compatible(todo_id)
    except Exception as e:
        return str(e)
def addTodoService(todo_data):
    try:
        todo = Todo.addTodo(todo_data)
        return convert_to_json_compatible(todo)
    except Exception as e:
        return str(e)
def updateTodoService(todo_data):
    try:
        todo = Todo.updateTodo(todo_data)
        return convert_to_json_compatible(todo)
    except Exception as e:
        return str(e)
def deleteTodoService(todo_id):
    try:
        Todo.deleteTodo(todo_id)
        return jsonify({"status": "success", "message": "Todo deleted successfully"}), 200
    except Exception as e:
        return str(e)
def updateStatusService(data):
    try:
        todo = Todo.updateStatus(data)  # pass the entire dict here
        return convert_to_json_compatible(todo)
    except Exception as e:
        return str(e)
