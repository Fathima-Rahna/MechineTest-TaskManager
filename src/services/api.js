
import axios from 'axios';

const API_URL = "http://82.180.145.66/api/v1/";
//register
export const registerUser = async (data) => {
  return await axios.post(`${API_URL}register/`, data);
};


//login
export const loginUser = async (data) => {
  return await axios.post(`${API_URL}login/`, data);
};
//get
export const getTasks = async (token) => {
  return await axios.get(`${API_URL}tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//create
export const createTask = async (taskData, token) => {
  return await axios.post(`${API_URL}tasks/`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


//update
export const updateTask = async (taskId, taskData, token) => {
  return await axios.put(`${API_URL}tasks/${taskId}/`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// delete a task
export const deleteTask = async (taskId, token) => {
  return await axios.delete(`${API_URL}tasks/${taskId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//profile
export const getProfile = async (token) => {
  return await axios.get(`${API_URL}profile/`, { // Use API_URL for full path
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// export const logoutUser = async (refreshToken) => {
//   return await axios.post(`${API_URL}logout/`, { refresh: refreshToken });
// };
