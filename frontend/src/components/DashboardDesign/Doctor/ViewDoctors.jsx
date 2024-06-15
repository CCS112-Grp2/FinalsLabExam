import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the Authorization header
                }
            };

            const response = await axios.get('http://127.0.0.1:8000/api/doctorlist', config);
            console.log('Doctors:', response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            toast.error('Failed to fetch doctors. Please try again later.');
        }
    };

    return (
        <Container>
            <div className='main-container'>
                <div className='main-title'>
                    <h3>View Doctors</h3>
                </div>
                <div>
                    {doctors.map(doctor => (
                        <Card key={doctor.id} style={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {doctor.name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Specialization:</strong> {doctor.specialization}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Email:</strong> {doctor.email}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Phone:</strong> {doctor.phone}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>License Number:</strong> {doctor.license_number}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default ViewDoctors;
