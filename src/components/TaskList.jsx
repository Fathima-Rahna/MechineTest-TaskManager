
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/api';
import TaskForm from './TaskForm';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleTaskCreated = () => {
    fetchTasks();
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const taskMatches = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'completed') return task.status && taskMatches;
    if (filter === 'pending') return !task.status && taskMatches;
    return taskMatches;
  });

  if (loading) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3>Your Tasks</h3>

      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search tasks..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className="btn btn-info mt-2" onClick={() => setFilter('all')}>All</button>
        <button className="btn btn-success ml-2" onClick={() => setFilter('completed')}>Completed</button>
        <button className="btn btn-warning ml-2" onClick={() => setFilter('pending')}>Pending</button>
        <button className="btn btn-primary ml-2" onClick={() => { setShowForm(true); setEditingTask(null); }}>Add Task</button>
      </div>

      {showForm && (
        <TaskForm 
          onTaskCreated={handleTaskCreated} 
          token={token} 
          editingTask={editingTask}
          setEditingTask={setEditingTask} 
          onCancel={handleCancel}
        />
      )}

      <div className="list-group mt-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{task.title}</h5>
              <p className="mb-1">{task.description}</p>
              <span className={`badge ${task.status ? 'badge-success' : 'badge-warning'}`}>
                {task.status ? 'Completed' : 'Pending'}
              </span>
              <p className="mb-1"><small>Created at: {new Date(task.created_at).toLocaleString()}</small></p>
              <p className="mb-1"><small>Updated at: {new Date(task.updated_at).toLocaleString()}</small></p>
            </div>
            <div>
              <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditTask(task)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
