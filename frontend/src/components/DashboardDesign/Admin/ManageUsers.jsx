import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '', name: '', email: '', password: '', role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAdd = () => {
    setCurrentUser({
      id: '', name: '', email: '', password: '', role: ''
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/users/${currentUser.id}`, currentUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('User updated successfully');
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/users/add', currentUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('User added successfully');
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to save user: ' + (error.response?.data?.message || error.message));
    }
  };

  // Function to handle role filter change
  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  // Filtered users based on selected role
  const filteredUsers = users.filter(user => {
    return filterRole === '' || user.role === filterRole;
  });


  return (
    <main className='main-container'>
      <ToastContainer />
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h3>Manage Users</h3>
          <Button variant="primary" className="mr-3 mt-2" onClick={handleAdd}>Add User</Button>
        </div>
        <div className="d-flex align-items-center">
          <div className="row">
            <div className="col-auto">
              <Form.Label className="me-2">Filter by Role:</Form.Label>
            </div>
            <div className="col-auto">
              <Form.Control
                as="select"
                value={filterRole}
                onChange={handleFilterChange}
                className="w-auto">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </Form.Control>
            </div>
          </div>
        </div>
      </div>
      <Container>
        {filteredUsers.map(user => (
          <Row className="mb-3 mt-3" key={user.id}>
            <Col key={user.id}>
              <Card className='mb-1' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <h5 className='card-title'>{user.name}</h5>
                  <p className='card-text'>Email: {user.email}</p>
                  <p className='card-text'>Role: {user.role}</p>
                  <div className="d-flex justify-content-end">
                    <Button variant="warning" className="mr-2" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="danger" className="mr-2" onClick={() => handleDelete(user.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md='6'>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md='6'>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={currentUser.password} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                    disabled={currentUser.role === 'doctor' || currentUser.role === 'patient'}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="patient">Receptionist</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
          <Button variant='primary' onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add User'}</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ManageUsers;
