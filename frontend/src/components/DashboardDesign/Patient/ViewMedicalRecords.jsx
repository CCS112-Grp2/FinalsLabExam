import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewMedicalRecords() {
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    const fetchMedicalRecords = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/patient-medical-records', {
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
                <h4 className="mt-5">Your Medical Records</h4>
                {medicalRecords.map(record => (
                    <Row className="mb-3 mt-3" key={record.id}>
                        <Col>
                            <Card className='mb-1' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Card.Body>
                                    <h5 className='card-title'>Visit Date: {formatDate(record.visit_date)}</h5>
                                    <p className='card-text'>Diagnosis: {record.diagnosis}</p>
                                    <p className='card-text'>Treatment: {record.treatment}</p>
                                    <p className='card-text'>Notes: {record.notes}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>
        </main>
    );
}

export default ViewMedicalRecords;
