import React, { useState } from 'react';
import axios from 'axios';

function ScheduleAppointments() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    status: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/appointments', formData);
      console.log('Appointment created:', response.data);
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data);
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Schedule Appointments</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor ID:</label>
          <input
            type="text"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Schedule Appointment</button>
      </form>
    </main>
  );
}

export default ScheduleAppointments;
