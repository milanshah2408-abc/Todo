import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editTodo, setEditTodo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [forceUpdate]);

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;
    try {
      setLoading(true);
      await todoService.addTodo(newTodo);
      setNewTodo({ title: '', description: '' });
      setForceUpdate(prev => prev + 1);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (todo) => {
    try {
      setLoading(true);
      const newStatus = !todo.completed;
      const updatedList = await todoService.updateTodoStatus(todo.id, newStatus);
      setTodos(updatedList);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTodo = async () => {
    if (!editTodo) return;
    try {
      setLoading(true);
      await todoService.updateTodo({
        id: editTodo.id,
        title: editTodo.title,
        description: editTodo.description,
      });
      setOpenDialog(false);
      setEditTodo(null);
      setForceUpdate(prev => prev + 1);
    } catch (error) {
      console.error('Error editing todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      const updatedList = await todoService.deleteTodo(id);
      setTodos(updatedList);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const renderTodoItem = (todo) => (
    <div
      key={todo.id}
      className={`todo-item ${todo.completed ? 'completed-todo' : ''}`}
    >
      <div className="todo-content">
        <div className="todo-text">
          <h3 className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </h3>
          <p className={todo.completed ? 'completed' : ''}>
            {todo.description}
          </p>
        </div>
        <div className="todo-actions">
          <button
            onClick={() => handleUpdateTodo(todo)}
            className={`status-button ${todo.completed ? 'completed' : ''}`}
          >
            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button
            onClick={() => {
              setEditTodo(todo);
              setOpenDialog(true);
            }}
            className="edit-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="delete-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      {/* Add Todo Form */}
      <div className="add-todo-form">
        <div className="form-grid">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="todo-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="todo-input"
          />
          <button
            onClick={handleAddTodo}
            disabled={!newTodo.title.trim()}
            className="add-button"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Incomplete Todos */}
      <div className="todo-section">
        <h2 className="section-title">Incomplete Tasks</h2>
        <div className="todo-list">
          {incompleteTodos.length > 0 ? (
            incompleteTodos.map(renderTodoItem)
          ) : (
            <p className="empty-message">No incomplete tasks</p>
          )}
        </div>
      </div>

      {/* Completed Todos */}
      <div className="todo-section">
        <h2 className="section-title">Completed Tasks</h2>
        <div className="todo-list">
          {completedTodos.length > 0 ? (
            completedTodos.map(renderTodoItem)
          ) : (
            <p className="empty-message">No completed tasks</p>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2 className="dialog-title">Edit Todo</h2>
            <div className="dialog-content">
              <input
                type="text"
                placeholder="Title"
                value={editTodo?.title || ''}
                onChange={(e) =>
                  setEditTodo(editTodo ? { ...editTodo, title: e.target.value } : null)
                }
                className="todo-input"
              />
              <input
                type="text"
                placeholder="Description"
                value={editTodo?.description || ''}
                onChange={(e) =>
                  setEditTodo(
                    editTodo ? { ...editTodo, description: e.target.value } : null
                  )
                }
                className="todo-input"
              />
            </div>
            <div className="dialog-actions">
              <button
                onClick={() => setOpenDialog(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTodo}
                className="save-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList; 