import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorDetailsAndAppointments();
  }, []);

  const fetchDoctorDetailsAndAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      // Fetch current doctor's details
      const doctorDetailsResponse = await axios.get('http://127.0.0.1:8000/api/doctor-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const doctorId = doctorDetailsResponse.data.id;

      // Fetch appointments related to the doctor
      const appointmentsResponse = await axios.get('http://127.0.0.1:8000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch patients to get patient names
      const patientsResponse = await axios.get('http://127.0.0.1:8000/api/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Map appointments with patient names
      const doctorAppointments = appointmentsResponse.data.map(appointment => {
        const patient = patientsResponse.data.find(patient => patient.id === appointment.patient_id);
        return {
          ...appointment,
          patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient',
        };
      }).filter(appointment => appointment.doctor_id === doctorId);

      setAppointments(doctorAppointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Handle error state or show a toast message
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  return (
    <MDBContainer fluid>
      <div className="main-title mb-4">
        <h3>View Appointments</h3>
      </div>
      <div className="mt-4">
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </MDBContainer>
  );
}

export default ViewAppointments;
