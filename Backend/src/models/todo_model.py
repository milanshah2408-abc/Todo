from database.database import get_db_connection
from flask import json
import datetime
import uuid
from utils.utils import *



class Todo:
    @staticmethod
    def getTodoModel():
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    SELECT * FROM todos;
                """
            cursor.execute(sql)
            todos = cursor.fetchall()
            cursor.close()
            return {"Status": True, "message": "data fetched successfully", "data": todos}
        except Exception as e:
            print(f"Error while fetching data from Todo: {str(e)}")
            return {"Status": False, "message": f"Todo fetch failed: {str(e)}"}
    @staticmethod
    def getTodoById(todo_id):
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    SELECT * FROM todos WHERE id = %s;
                """
            cursor.execute(sql, (todo_id,))
            todo = cursor.fetchone()
            cursor.close()
            if todo:
                return {"Status": True, "message": "data fetched successfully", "data": todo}
            else:
                return {"Status": False, "message": "Todo not found"}
        except Exception as e:
            print(f"Error while fetching Todo by ID: {str(e)}")
            return {"Status": False, "message": f"Todo fetch failed: {str(e)}"}
    
    @staticmethod
    def addTodo(todo_data):
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    INSERT INTO todos (title, description, completed) 
                    VALUES (%s, %s, %s);
                """
            cursor.execute(sql, (todo_data['title'], todo_data['description'], todo_data.get('completed', False)))
            db.commit()
            cursor.close()
            return {"Status": True, "message": "Todo added successfully"}
        except Exception as e:
            print(f"Error while adding Todo: {str(e)}")
            return {"Status": False, "message": f"Todo addition failed: {str(e)}"}
    @staticmethod
    def updateTodo(todo_data):
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    UPDATE todos 
                    SET title = %s, description = %s, completed = %s 
                    WHERE id = %s;
                """
            cursor.execute(sql, (todo_data['title'], todo_data['description'], todo_data.get('completed', False), todo_data['id']))
            db.commit()
            cursor.close()
            return {"Status": True, "message": "Todo updated successfully"}
        except Exception as e:
            print(f"Error while updating Todo: {str(e)}")
            return {"Status": False, "message": f"Todo update failed: {str(e)}"}
    @staticmethod
    def deleteTodo(data):
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    DELETE FROM todos WHERE id = %s;
                """
            todo_id = data['id']
            cursor.execute(sql, (todo_id,))
            db.commit()
            cursor.close()
            return {"Status": True, "message": "Todo deleted successfully"}
        except Exception as e:
            print(f"Error while deleting Todo: {str(e)}")
            return {"Status": False, "message": f"Todo deletion failed: {str(e)}"}
    @staticmethod
    def updateStatus(data):
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            sql = """
                    UPDATE todos 
                    SET completed = %s 
                    WHERE id = %s;
                """
            todo_id = data['id']
            status = data['completed']
            cursor.execute(sql, (status, todo_id))
            db.commit()
            cursor.close()
            return {"Status": True, "message": "Todo status updated successfully"}
        except Exception as e:
            print(f"Error while updating Todo status: {str(e)}")
            return {"Status": False, "message": f"Todo status update failed: {str(e)}"}