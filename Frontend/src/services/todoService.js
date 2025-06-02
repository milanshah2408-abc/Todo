import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const todoService = {
  async getAllTodos() {
    try {
      const response = await fetch(`${API_URL}/getTodos`);
      const result = await response.json();
      if (result.Status) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch todos');
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  getTodoById: async (id) => {
    const response = await axios.post(`${API_URL}/getTodoByID`, { id });
    return response.data;
  },

  async addTodo(todo) {
    try {
      const response = await fetch(`${API_URL}/addTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const result = await response.json();
      if (result.Status) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to add todo');
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  async updateTodo(todo) {
    try {
      const response = await fetch(`${API_URL}/updateTodo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: todo.id,
          title: todo.title,
          description: todo.description
        }),
      });
      const result = await response.json();
      if (result.Status) {
        const updatedList = await this.getAllTodos();
        return updatedList;
      }
      throw new Error(result.message || 'Failed to update todo');
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async updateTodoStatus(id, completed) {
    try {
      const response = await fetch(`${API_URL}/updateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed }),
      });
      const result = await response.json();
      if (result.Status) {
        const updatedList = await this.getAllTodos();
        return updatedList;
      }
      throw new Error(result.message || 'Failed to update todo status');
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_URL}/deleteTodo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      const updatedList = await this.getAllTodos();
      return updatedList;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};
