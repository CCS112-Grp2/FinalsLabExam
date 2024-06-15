import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import { Modal, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({
    id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', address: '',
    phone: '', email: '', emergency_contact: '', medical_history: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin-patients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPatients(response.data);
    } catch (error) {
      toast.error('Failed to fetch patients: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAdd = () => {
    setCurrentPatient({
      id: '', first_name: '', last_name: '', date_of_birth: '', gender: '', address: '',
      phone: '', email: '', emergency_contact: '', medical_history: '', password: '' // Add password field
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (patient) => {
    setCurrentPatient({
      ...patient,
      password: '', // Clear the password field when editing
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin-patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPatients(patients.filter(patient => patient.id !== id));
      toast.success('Patient deleted successfully');
    } catch (error) {
      toast.error('Failed to delete patient: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const patientData = {
      ...currentPatient,
      name: `${currentPatient.first_name} ${currentPatient.last_name}` // Combine first and last name for the user's name
    };

    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/admin-patients/${currentPatient.id}`, patientData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Patient updated successfully');
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/admin-patients/add', patientData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Patient added successfully');
      }
      setShowModal(false);
      fetchPatients(); // Refresh the list of patients after saving
    } catch (error) {
      toast.error('Failed to save patient: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <main className='main-container'>
      <ToastContainer />
      <div className='main-title'>
        <h3>Manage Patients</h3>
        <Button variant="primary" className="mb-5" onClick={handleAdd}>Add Patient</Button>
      </div>
      <Container>
        {patients.map(patient => (
          <Row className="mb-3" key={patient.id}>
            <Col key={patient.id}>
              <Card className='mb-1' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <h5 className='card-title'>{patient.first_name} {patient.last_name}</h5>
                  <p className='card-text'>Email: {patient.email}</p>
                  <p className='card-text'>Phone: {patient.phone}</p>
                  <p className='card-text'>Gender: {patient.gender}</p>
                  <p className='card-text'>Date of Birth: {patient.date_of_birth}</p>
                  <p className='card-text'>Address: {patient.address}</p>
                  <p className='card-text'>Emergency Contact: {patient.emergency_contact}</p>
                  <p className='card-text'>Medical History: {patient.medical_history}</p>
                  <div className="d-flex justify-content-end">
                    <Button variant="warning" className="mr-2" onClick={() => handleEdit(patient)}>Edit</Button>
                    <Button variant="danger" className="mr-2" onClick={() => handleDelete(patient.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Patient' : 'Add Patient'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md='6'>
                <MDBInput
                  label="First Name"
                  type="text"
                  value={currentPatient.first_name}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, first_name: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="Last Name"
                  type="text"
                  value={currentPatient.last_name}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, last_name: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <MDBInput
              label="Email"
              type="email"
              value={currentPatient.email}
              onChange={(e) => setCurrentPatient({ ...currentPatient, email: e.target.value })}
              className='mb-3'
            />
            <MDBInput
              label="Password" // Add this input
              type="password"
              value={currentPatient.password}
              onChange={(e) => setCurrentPatient({ ...currentPatient, password: e.target.value })}
              className='mb-3'
            />
            <Row>
              <Col md='6'>
                <MDBInput
                  label="Date of Birth"
                  type="date"
                  value={currentPatient.date_of_birth}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, date_of_birth: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="Gender"
                  type="text"
                  value={currentPatient.gender}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, gender: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <MDBInput
                  label="Address"
                  type="text"
                  value={currentPatient.address}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, address: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <MDBInput
                  label="Phone"
                  type="text"
                  value={currentPatient.phone}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, phone: e.target.value })}
                  className='mb-3'
                />
              </Col>
              <Col md='6'>
                <MDBInput
                  label="Emergency Contact"
                  type="text"
                  value={currentPatient.emergency_contact}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, emergency_contact: e.target.value })}
                  className='mb-3'
                />
              </Col>
            </Row>
            <MDBInput
              label="Medical History"
              type="textarea"
              value={currentPatient.medical_history}
              onChange={(e) => setCurrentPatient({ ...currentPatient, medical_history: e.target.value })}
              className='mb-3'
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
          <Button variant='primary' onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Patient'}</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ManagePatients;
