import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { Form, Button } from 'react-bootstrap';

function BookAppointment() {
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        reason: ''
    });
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/doctorlist', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else if (response.data && typeof response.data === 'object') {
                    setDoctors([response.data]);
                    setFormData({ ...formData, doctor_id: response.data.id });
                }
            } catch (error) {
                console.error('Error fetching doctor details:', error);
                toast.error('Failed to fetch doctor details: ' + (error.response?.data?.message || error.message));
            }
        };

        fetchDoctors();
    }, []);

    // Fetch patient details and appointments on component mount
    useEffect(() => {
        const fetchPatientData = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch patient details
                const response = await axios.get('http://127.0.0.1:8000/api/patients-details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFormData({ ...formData, patient_id: response.data.id });

                // Fetch appointments for the logged-in patient
                const appointmentsResponse = await axios.get(`http://127.0.0.1:8000/api/patient/appointments?patient_id=${response.data.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Map appointments to include doctor's name instead of doctor_id
                const updatedAppointments = appointmentsResponse.data.map(appointment => ({
                    ...appointment,
                    doctor_name: doctors.find(doctor => doctor.id === appointment.doctor_id)?.name || 'Unknown Doctor'
                }));

                setAppointments(updatedAppointments);
            } catch (error) {
                console.error('Error fetching patient details:', error);
                toast.error('Failed to fetch patient details: ' + (error.response?.data?.message || error.message));
            }
        };

        fetchPatientData();
    }, [doctors]); // Added doctors as a dependency to update appointments when doctors change

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission to book appointment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            // Post request to book appointment
            const response = await axios.post('http://127.0.0.1:8000/api/patient/appointments/add', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Appointment booked successfully');

            // Fetch updated appointments for the logged-in patient
            const appointmentsResponse = await axios.get(`http://127.0.0.1:8000/api/patient/appointments?patient_id=${formData.patient_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Map appointments to include doctor's name instead of doctor_id
            const updatedAppointments = appointmentsResponse.data.map(appointment => ({
                ...appointment,
                doctor_name: doctors.find(doctor => doctor.id === appointment.doctor_id)?.name || 'Unknown Doctor'
            }));

            setAppointments(updatedAppointments);
        } catch (error) {
            console.error('Error booking appointment:', error.response?.data);
            toast.error('Error booking appointment: ' + (error.response?.data?.message || error.message));
        }
    };

    const cancelAppointment = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/patient/appointments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Appointment canceled successfully');
            await fetchAppointments(); // Refresh appointments after cancellation
        } catch (error) {
            console.error('Error canceling appointment:', error);
            toast.error('Failed to cancel appointment: ' + (error.response?.data?.message || error.message));
        }
    };

    const rescheduleAppointment = async (id, newDate) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/patient/appointments/${id}`, { appointment_date: newDate }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Appointment rescheduled successfully');
            await fetchAppointments(); // Refresh appointments after rescheduling
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            toast.error('Failed to reschedule appointment: ' + (error.response?.data?.message || error.message));
        }
    };


    return (
        <MDBContainer fluid>
            <div className='main-title'>
                <h3>Book an Appointment</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <Form.Label>Doctor</Form.Label>
                        <select
                            className='form-select'
                            name='doctor_id'
                            value={formData.doctor_id}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} ({doctor.id})
                                </option>
                            ))}
                        </select>
                    </MDBCol>
                </MDBRow>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput
                            label='Appointment Date'
                            name='appointment_date'
                            value={formData.appointment_date}
                            onChange={handleChange}
                            type='date'
                            required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput
                            label='Reason'
                            name='reason'
                            value={formData.reason}
                            onChange={handleChange}
                            type='text'
                            required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <Button type='submit' className='btn btn-primary'>Book Appointment</Button>
                    </MDBCol>
                </MDBRow>
            </Form>

            {/* Table to display appointments */}
            <MDBContainer fluid className='mt-5'>
                <MDBTable hover>
                    <MDBTableHead>
                        <tr>
                            <th>#</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{appointment.doctor_name}</td>
                                <td>{appointment.appointment_date}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>

            <ToastContainer />
        </MDBContainer>
    );
}

export default BookAppointment;
