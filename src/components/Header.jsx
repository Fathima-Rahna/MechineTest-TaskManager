
import { FaUsers } from 'react-icons/fa'; // Import the users icon
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <div className='d-flex justify-space-between'>
            <FaUsers className="me-4" />
            <p>Employee Portal</p>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

 export default Header