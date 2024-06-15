import React from 'react';
import { useNavigate } from 'react-router-dom';

import AdminDashboard from './Dashboards/AdminDashboard';
import DoctorDashboard from './Dashboards/DoctorDashboard';
import ReceptionistDashboard from './Dashboards/ReceptionistDashboard';
import PatientDashboard from './Dashboards/PatientDashboard';

function Dashboard() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    if (!role) {
        navigate('/');
        return null;
    }

    switch (role) {
        case 'admin':
            return <AdminDashboard />;
        case 'doctor':
            return <DoctorDashboard />;
        case 'receptionist':
            return <ReceptionistDashboard />;
        case 'patient':
            return <PatientDashboard />;
        default:
            navigate('/');
            return null;
    }
}

export default Dashboard;
