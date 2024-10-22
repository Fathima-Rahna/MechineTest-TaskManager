
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Dashheader({ onLogout }) {
  const handleLogout = () => {
    alert('Successfully logged out'); 
    onLogout(); 
  };

  return (
    <Navbar className="bg-dark">
      <Container className="d-flex justify-content-between">
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={handleLogout} className="btn btn-link text-white">Logout</button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Dashheader;



