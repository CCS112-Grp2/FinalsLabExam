import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScheduleAppointments() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    reason: '',
  });
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!loadingPatients && !loadingDoctors) {
      fetchAppointments();
    }
  }, [loadingPatients, loadingDoctors]);

  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reception-patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
      setLoadingPatients(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to fetch patients');
    }
  };

  const fetchDoctors = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctorlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
      setLoadingDoctors(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors');
    }
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/schedule-appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedAppointments = response.data.map(appointment => ({
        ...appointment,
        doctor: doctors.find(doctor => doctor.id === appointment.doctor_id) || {},
        patient: patients.find(patient => patient.id === appointment.patient_id) || {},
      }));
      setAppointments(updatedAppointments);
      setLoadingAppointments(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/schedule-appointments/add',
        {
          ...formData,
          status: 'Pending', // Set status to 'Pending' here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Appointment scheduled successfully');
      setFormData({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        reason: '',
      });
      reloadAppointments(); // Reload appointments after successful scheduling
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data);
      toast.error('Failed to schedule appointment');
    }
  };

  const reloadAppointments = () => {
    setLoadingAppointments(true); // Set loading state to true to show loading message
    fetchAppointments(); // Fetch appointments again
  };

  if (loadingPatients || loadingDoctors || loadingAppointments) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  return (
    <MDBContainer fluid>
      <div className="main-title mb-4">
        <h3>Schedule Appointments</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <MDBRow className="mb-4">
          <MDBCol>
            <Form.Label className="mb-2">Patient</Form.Label>
            <Form.Select
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              required
              className="mb-3"
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name} - {patient.id}
                </option>
              ))}
            </Form.Select>
          </MDBCol>
          <MDBCol>
            <Form.Label className="mb-2">Doctor</Form.Label>
            <Form.Select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              required
              className="mb-3"
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.id}
                </option>
              ))}
            </Form.Select>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              label="Appointment Date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              type="date"
              required
              className="mb-3"
            />
          </MDBCol>
          {/* Removed Status field from here */}
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              type="text"
              required
              className="mb-3"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <Button type="submit" className="btn btn-primary mt-3">
              Schedule Appointment
            </Button>
          </MDBCol>
        </MDBRow>
      </Form>
      <div className="mt-4">
        <h3>Existing Appointments</h3>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient?.first_name} {appointment.patient?.last_name}</td>
                <td>{appointment.doctor?.name}</td>
                <td>{appointment.appointment_date}</td>
                <td>Pending</td>
                <td>{appointment.reason}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      <ToastContainer />
    </MDBContainer>
  );
}

export default ScheduleAppointments;
