

import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ onTaskCreated, token, editingTask, setEditingTask, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' }); 

  useEffect(() => {
    if (editingTask) {
      setTask({ ...editingTask, status: editingTask.status ? 'completed' : 'pending' });
    } else {
      setTask({ title: '', description: '', status: 'pending' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
       
        await updateTask(editingTask.id, { ...task, status: task.status === 'completed' }, token);
        setEditingTask(null); 
      } else {
        
        await createTask({ ...task, status: task.status === 'completed' }, token);
      }
      onTaskCreated(); 
      setTask({ title: '', description: '', status: 'pending' }); 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-4 border p-4 rounded bg-light">
      <h4 className="mb-3">{editingTask ? 'Edit Task' : 'Add Task'}</h4>
      <div className="form-group">
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          className="form-control"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          className="form-control"
          value={task.status}
          onChange={handleChange} 
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
   


<button type="submit" className="btn btn-primary">
    {editingTask ? 'Update Task' : 'Add Task'}
</button>
<button type="button" className="btn btn-secondary " onClick={onCancel} style={{ marginLeft: '10px' }}>
    Cancel
</button>

    </form>
  );
};

export default TaskForm;
