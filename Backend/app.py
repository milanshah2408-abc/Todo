from flask import Flask
from flask_cors import CORS
from config.config import HOST, PORT
from src.routes.todo_routes import todo_routes_bp
import jwt

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "supports_credentials": True
    }
})

# Register blueprints
app.register_blueprint(todo_routes_bp, url_prefix='/api/todos')

if __name__ == '__main__':
    app.run(HOST, PORT, debug=False)

