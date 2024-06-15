import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

function ManagePatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/patients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPatients(response.data);
    } catch (error) {
      toast.error('Failed to fetch patients: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <h3 className='my-4'>Manage Patients</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Emergency Contact</th>
                <th>Medical History</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.date_of_birth}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.address}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.emergency_contact}</td>
                  <td>{patient.medical_history}</td>
                  <td>
                    {/* Link to View Medical Records page */}
                    <Link to={`/dashboard/view-medical-records/${patient.id}`} className="btn btn-secondary">Manage Medical Records</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ManagePatients;
