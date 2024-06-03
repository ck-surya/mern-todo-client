import React, { useState } from 'react';

const Task = ({ task, handleDeleteTask, handleEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleDelete = () => {
        handleDeleteTask(task._id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        handleEditTask(task._id, editedTask);
        setIsEditing(false);
    };

    return (
        <tr className="task-row">
            <td className="task-cell">{isEditing ? <input type="text" name="name" value={editedTask.name} onChange={handleChange} /> : task.name}</td>
            <td className="task-cell">{isEditing ? <input type="date" name="endDate" value={editedTask.endDate} onChange={handleChange} /> : task.endDate}</td>
            <td className="task-cell">
                {isEditing ? (
                    <select name="status" value={editedTask.status} onChange={handleChange}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                ) : (
                    <span className={`status-badge ${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
                )}
            </td>
            <td className="task-cell">{isEditing ? <input type="text" name="priority" value={editedTask.priority} onChange={handleChange} /> : task.priority}</td>
            <td className="task-cell">{isEditing ? <input type="text" name="progress" value={editedTask.progress} onChange={handleChange} /> : task.progress}</td>
            <td className="task-cell">{isEditing ? <input type="text" name="assignees" value={editedTask.assignees.join(', ')} onChange={handleChange} /> : task.assignees.join(', ')}</td>
            <td className="task-cell">
                {isEditing ? (
                    <button className="save-button" onClick={handleSave}>Save</button>
                ) : (
                    <>
                        <button className="edit-button" onClick={handleEdit}>Edit</button>
                        <button className="delete-button" onClick={handleDelete}>
                            <svg className="delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default Task;
