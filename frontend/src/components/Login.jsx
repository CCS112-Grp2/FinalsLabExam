import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });
            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            setError(error.response.data.message);
            toast.error('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <div className='glassmorphism-background'>
            <MDBContainer fluid className='d-flex justify-content-center align-items-center vh-100'>
                <ToastContainer />
                <MDBRow className='g-0 align-items-center w-100 h-100'>
                    <MDBCol md='6' className='d-none d-md-block h-100'>
                    </MDBCol>
                    <MDBCol md='6' className='h-100 d-flex align-items-center justify-content-center p-0'>
                        <MDBCard className='w-100 h-100 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)', borderRadius: '0' }}>
                            <MDBCardBody className='p-5 shadow-5 text-center d-flex flex-column justify-content-center'>
                                <h2 className="fw-bold mb-5">Sign in</h2>
                                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                {error && <p className='text-danger'>{error}</p>}
                                <MDBBtn className="mb-4 w-100" onClick={handleLogin}>Sign in</MDBBtn>
                                <MDBBtn className="w-100" color="secondary" onClick={() => navigate('/register')}>Sign up</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Login;
