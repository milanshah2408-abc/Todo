from cerberus import Validator

getTodoByIDSchema = {
    'id': {'type': 'integer', 'required': True, 'min': 1}
}
addTodoSchema = {
    'title': {'type': 'string', 'required': True, 'minlength': 1},
    'description': {'type': 'string', 'required': True, 'minlength': 1},
    'completed': {'type': 'boolean', 'required': False, 'default': False},
}
updateTodoSchema = {
    'id': {'type': 'integer', 'required': True, 'min': 1},
    'title': {'type': 'string', 'required': True, 'minlength': 1},
    'description': {'type': 'string', 'required': True, 'minlength': 1},
    'completed': {'type': 'boolean', 'required': False, 'default': False},
}
deleteTodoSchema = {
    'id': {'type': 'integer', 'required': True, 'min': 1}
} 
updateStatusSchema = {
    'id': {'type': 'integer', 'required': True, 'min': 1},
    'completed': {'type': 'boolean', 'required': True}
}
def todo_route_schema_request(data, schema_name):
    try:
        v = Validator(schema_name)
        if not v.validate(data):
            return v.errors
        return None
    except Exception as e:
        return str(e)