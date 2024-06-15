import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewMedicalRecords() {
    const { patientId } = useParams(); // Extract patientId from route parameters
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [patientIdReadOnly, setPatientIdReadOnly] = useState(patientId); // State to hold the patientId for display
    const [form, setForm] = useState({
        patient_id: patientId,
        doctor_id: '', // Assuming doctor_id will be fetched dynamically
        visit_date: '',
        diagnosis: '',
        treatment: '',
        notes: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [currentRecordId, setCurrentRecordId] = useState(null);

    useEffect(() => {
        fetchDoctorDetails();
    }, []);

    useEffect(() => {
        if (doctorId) {
            fetchMedicalRecords();
        }
    }, [doctorId]);

    const fetchDoctorDetails = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/doctor-details', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Doctor Details:', response.data); // Log successful response
            if (response.data) {
                setDoctorId(response.data.id); // Assuming the doctor's ID is in response.data.id
                setForm({ ...form, doctor_id: response.data.id }); // Ensure response.data.id is correctly set
            }
        } catch (error) {
            console.error('Error fetching doctor details:', error); // Log error
            toast.error('Failed to fetch doctor details: ' + (error.response?.data?.message || error.message));
        }
    };

    const fetchMedicalRecords = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}/medical-records`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Medical Records:', response.data); // Log successful response
            setMedicalRecords(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error); // Log error
            toast.error('Failed to fetch medical records: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            // Format the form data before sending
            const formattedFormData = {
                patient_id: parseInt(form.patient_id), // Ensure patient_id is an integer
                doctor_id: parseInt(form.doctor_id), // Ensure doctor_id is an integer
                visit_date: form.visit_date, // Date format should already be 'yyyy-mm-dd'
                diagnosis: form.diagnosis,
                treatment: form.treatment,
                notes: form.notes
            };

            const response = await axios.post('http://127.0.0.1:8000/api/medical-records/add', formattedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Add Medical Record Response:', response.data); // Log successful response
            setMedicalRecords([...medicalRecords, response.data]);
            toast.success('Medical record added successfully!');
            // Clear form fields after successful submission if needed
            setForm({
                patient_id: patientId,
                doctor_id: form.doctor_id, // Ensure doctor_id is preserved
                visit_date: '',
                diagnosis: '',
                treatment: '',
                notes: ''
            });
        } catch (error) {
            console.error('Failed to add medical record:', error); // Log error
            toast.error('Failed to add medical record: ' + (error.response?.data?.message || error.message));
        }
    };

    const openModal = (record) => {
        setCurrentRecordId(record.id);
        setForm({
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            visit_date: formatDate(record.visit_date),
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            notes: record.notes
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm({
            patient_id: patientId,
            doctor_id: doctorId,
            visit_date: '',
            diagnosis: '',
            treatment: '',
            notes: ''
        });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/medical-records/${currentRecordId}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Update Medical Record Response:', response.data); // Log successful response
            setMedicalRecords(medicalRecords.map(record => record.id === currentRecordId ? response.data : record));
            toast.success('Medical record updated successfully!');
            closeModal();
        } catch (error) {
            console.error('Failed to update medical record:', error); // Log error
            toast.error('Failed to update medical record: ' + (error.response?.data?.message || error.message));
        }
    };

    // Function to format date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <main className='main-container'>
            <ToastContainer />
            <div className='main-title'>
                <h3>View Medical Records</h3>
            </div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Visit Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="visit_date"
                            value={form.visit_date}
                            onChange={handleInputChange}
                            min="1900-01-01"
                            max="2100-12-31"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Diagnosis</Form.Label>
                        <Form.Control type="text" name="diagnosis" value={form.diagnosis} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Treatment</Form.Label>
                        <Form.Control type="text" name="treatment" value={form.treatment} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" name="notes" value={form.notes} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 mb-3">Add Medical Record</Button>
                </Form>
                <h4 className="mt-5">Patient Medical Record List</h4> {/* Added heading */}
                {medicalRecords.map(record => (
                    <Row className="mb-3 mt-3" key={record.id}>
                        <Col>
                            <Card className='mb-1' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Card.Body>
                                    <h5 className='card-title'>Visit Date: {formatDate(record.visit_date)}</h5>
                                    <p className='card-text'>Diagnosis: {record.diagnosis}</p>
                                    <p className='card-text'>Treatment: {record.treatment}</p>
                                    <p className='card-text'>Notes: {record.notes}</p>
                                    <Button variant="secondary" onClick={() => openModal(record)} className="mt-2">Update</Button> {/* Added margin top */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Medical Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Visit Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="visit_date"
                                value={form.visit_date}
                                onChange={handleInputChange}
                                min="1900-01-01"
                                max="2100-12-31"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Diagnosis</Form.Label>
                            <Form.Control type="text" name="diagnosis" value={form.diagnosis} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Treatment</Form.Label>
                            <Form.Control type="text" name="treatment" value={form.treatment} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type="text" name="notes" value={form.notes} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update Medical Record</Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default ViewMedicalRecords;

