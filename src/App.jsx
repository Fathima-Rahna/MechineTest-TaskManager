

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Profile from './components/Profile'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;

