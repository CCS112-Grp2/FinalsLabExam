import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { Form, Button, Modal } from 'react-bootstrap';

function ManageAppointments() {
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        reason: ''
    });
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState(null);
    const [newAppointmentDate, setNewAppointmentDate] = useState('');

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
            await fetchAppointments();
        } catch (error) {
            console.error('Error booking appointment:', error.response?.data);
            toast.error('Error booking appointment: ' + (error.response?.data?.message || error.message));
        }
    };

    // Function to fetch appointments for the logged-in patient
    const fetchAppointments = async () => {
        const token = localStorage.getItem('token');
        try {
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
            console.error('Error fetching appointments:', error.response?.data);
            toast.error('Failed to fetch appointments: ' + (error.response?.data?.message || error.message));
        }
    };

    // Function to cancel an appointment
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

    // Function to open reschedule modal
    const openRescheduleModal = (id) => {
        setRescheduleAppointmentId(id);
        setNewAppointmentDate('');
    };

    // Function to close reschedule modal
    const closeRescheduleModal = () => {
        setRescheduleAppointmentId(null);
    };

    // Function to reschedule an appointment
    const rescheduleAppointment = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/patient/appointments/${rescheduleAppointmentId}`, { appointment_date: newAppointmentDate }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Appointment rescheduled successfully');
            closeRescheduleModal(); // Close modal after rescheduling
            await fetchAppointments(); // Refresh appointments after rescheduling
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            toast.error('Failed to reschedule appointment: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <MDBContainer fluid>
            <div className='main-title'>
                <h3>Manage Appointments</h3>
            </div>

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
                            <th>Actions</th> {/* Added Actions column */}
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
                                <td>
                                    <Button variant='danger' onClick={() => cancelAppointment(appointment.id)}>Cancel</Button>
                                    <Button variant='info' onClick={() => openRescheduleModal(appointment.id)}>Reschedule</Button>

                                    {/* Reschedule Modal */}
                                    <                                        Modal show={rescheduleAppointmentId === appointment.id} onHide={closeRescheduleModal} backdrop="static" keyboard={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Reschedule Appointment</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group className='mb-3'>
                                                <Form.Label>New Appointment Date</Form.Label>
                                                <Form.Control
                                                    type='date'
                                                    name='newAppointmentDate'
                                                    value={newAppointmentDate}
                                                    onChange={(e) => setNewAppointmentDate(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant='secondary' onClick={closeRescheduleModal}>Cancel</Button>
                                            <Button variant='info' onClick={rescheduleAppointment}>Save</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>

            <ToastContainer />
        </MDBContainer>
    );
}

export default ManageAppointments;

