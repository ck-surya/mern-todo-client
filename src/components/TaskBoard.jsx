import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import Task from './Task';

export default function TaskBoard() {
  const { tasks, loading, error, addTask, deleteTask, editTask } = useTasks();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', endDate: '', status: 'Not Started', priority: '', assignees: [], progress: '0%' });

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleSaveTaskClick = async () => {
    await addTask(newTask);
    setIsAddingTask(false);
    setNewTask({ name: '', endDate: '', status: 'Not Started', priority: '', assignees: [], progress: '0%' });
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      await editTask(taskId, updatedTask);
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="task-board">
      <div className="task-board-header">
        <div className="task-board-title">Task Board</div>
        
      </div>
      <div className="task-board-body">
        {isAddingTask ? (
          <div className="add-task-form">
            <input type="text" name="name" placeholder="Task Name" value={newTask.name} onChange={handleChange} />
            <input type="date" name="endDate" placeholder="End Date" value={newTask.endDate} onChange={handleChange} />
            <select name="status" value={newTask.status} onChange={handleChange}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="text" name="priority" placeholder="Priority" value={newTask.priority} onChange={handleChange} />
            <input type="text" name="assignees" placeholder="Assignees" value={newTask.assignees} onChange={handleChange} />
            <input type="text" name="progress" placeholder="Progress" value={newTask.progress} onChange={handleChange} />
            <button className="save-task-button" onClick={handleSaveTaskClick}>Save Task</button>
          </div>
        ) : (
          <button className="add-task-button" onClick={handleAddTaskClick}>+ Add New Task</button>
        )}
        <table className="task-table">
          <thead>
            <tr>
              <th className="task-table-header">Task</th>
              <th className="task-table-header">End Date</th>
              <th className="task-table-header">Status</th>
              <th className="task-table-header">Priority</th>
              <th className="task-table-header">Progress</th>
              <th className="task-table-header">Assignees</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task._id} task={task} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
