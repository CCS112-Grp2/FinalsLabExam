import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Register.css';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const role = 'patient'; // Default role set to 'patient'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name: `${firstName} ${lastName}`,
                email,
                password,
                role
            });
            // Handle successful registration
            console.log(response.data);
            toast.success('User registered successfully!');
            setSuccess('User registered successfully');
            setError('');
            setTimeout(() => {
                navigate('/'); // Redirect to the login page after a short delay
            }, 2000); // 2 seconds delay
        } catch (error) {
            // Handle error
            setError(error.response.data.message);
            toast.error('Registration failed: ' + error.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div className='glassmorphism-background'>
            <MDBContainer fluid className='d-flex justify-content-center align-items-center vh-100'>
                <ToastContainer />
                <MDBRow className='g-0 align-items-center w-100 h-100'>
                    <MDBCol md='6' className='d-none d-md-block h-100'>
                    </MDBCol>
                    <MDBCol md='6' className='h-100 d-flex align-items-center justify-content-center'>
                        <MDBCard className='w-100 h-100 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                            <MDBCardBody className='p-5 shadow-5 text-center d-flex flex-column justify-content-center position-relative'>
                                <MDBBtn 
                                    color='link' 
                                    className='position-absolute top-0 end-0 m-3' 
                                    onClick={() => navigate('/')}
                                >
                                    Back to Sign In
                                </MDBBtn>
                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                <MDBRow>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </MDBCol>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                {error && <p className='text-danger'>{error}</p>}
                                {success && <p className='text-success'>{success}</p>}
                                <MDBBtn className='w-100 mb-4' size='md' onClick={handleRegister}>Sign up</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Register;
