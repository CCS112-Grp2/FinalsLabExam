import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import { Modal, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState({
    id: '', name: '', email: '', password: '', first_name: '', last_name: '',
    specialization: '', license_number: '', phone: '', role: 'doctor'
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchDoctors = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = () => {
    setCurrentDoctor({
      id: '', name: '', email: '', password: '', first_name: '', last_name: '',
      specialization: '', license_number: '', phone: '', role: 'doctor'
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (doctor) => {
    setCurrentDoctor({
      ...doctor,
      password: '', // Clear the password field when editing
    });
    setIsEditing(true);
    setShowModal(true);
  };


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(doctors.filter(doctor => doctor.id !== id));
      toast.success('Doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      // Check if the password meets the length requirement
      if (isEditing && currentDoctor.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }

      const isValidEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      // Check if the email is in a valid format
      if (!isEditing && !isValidEmail(currentDoctor.email)) {
        toast.error('Invalid email format');
        return;
      }

      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/doctors/${currentDoctor.id}`, currentDoctor, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Doctor updated successfully');
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/doctors/add', currentDoctor, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Doctor added successfully');
      }
      setShowModal(false);
      fetchDoctors(); // Refresh the list of doctors after saving
    } catch (error) {
      toast.error('Failed to save doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <main className='main-container'>
      <ToastContainer />
      <div className='main-title'>
        <h3>Manage Doctors</h3>
        <Button variant="primary" className="mb-5" onClick={handleAdd}>Add Doctor</Button>
      </div>
      <Container>
        {doctors.map(doctor => (
          <Row className="mb-3" key={doctor.id}>
            <Col key={doctor.id}>
              <Card className='mb-1' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <h5 className='card-title'>{doctor.first_name} {doctor.last_name}</h5>
                  <p className='card-text'>Email: {doctor.email}</p>
                  <p className='card-text'>Specialization: {doctor.specialization}</p>
                  <p className='card-text'>License Number: {doctor.license_number}</p>
                  <p className='card-text'>Phone: {doctor.phone}</p>
                  <div className="d-flex justify-content-end">
                    <Button variant="warning" className="mr-2" onClick={() => handleEdit(doctor)}>Edit</Button>
                    <Button variant="danger" className="mr-2" onClick={() => handleDelete(doctor.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Doctor' : 'Add Doctor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md='6'>
                <MDBInput
                  label="Name"
                  type="text"
                  value={currentDoctor.name}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, name: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="Email"
                  type="email"
                  value={currentDoctor.email}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, email: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <MDBInput
                  label="Password"
                  type="password"
                  value={currentDoctor.password}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, password: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <MDBInput
                  label="First Name"
                  type="text"
                  value={currentDoctor.first_name}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, first_name: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="Last Name"
                  type="text"
                  value={currentDoctor.last_name}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, last_name: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <MDBInput
                  label="Specialization"
                  type="text"
                  value={currentDoctor.specialization}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, specialization: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="License Number"
                  type="text"
                  value={currentDoctor.license_number}
                  onChange={(e) => setCurrentDoctor({ ...currentDoctor, license_number: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <MDBInput
              label="Phone"
              type="text"
              value={currentDoctor.phone}
              onChange={(e) => setCurrentDoctor({ ...currentDoctor, phone: e.target.value })}
              className='mb-3'
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
          <Button variant='primary' onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Doctor'}</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ManageDoctors;
