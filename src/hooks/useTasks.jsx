import { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      // Make PUT request to update the task
      await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);

      // Update the tasks state with the updated task
      const updatedTasks = tasks.map(task => {
        // If the task ID matches the edited task's ID, return the updated task
        // Otherwise, return the original task
        return task._id === taskId ? updatedTask : task;
      });

      // Set the updated tasks array as the new state
      setTasks(updatedTasks);
    } catch (err) {
      // Handle errors
      console.error('Error editing task:', err);
      setError(err);
    }
  };


  return { tasks, loading, error, addTask, deleteTask, editTask };
};
