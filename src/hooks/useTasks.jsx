import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
      const updatedTasks = tasks.map(task => 
        task._id === taskId ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error editing task:', err);
      setError(err);
    }
  };

  return { tasks, loading, error, addTask, deleteTask, editTask };
};
