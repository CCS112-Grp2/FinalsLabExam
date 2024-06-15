import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../DashboardDesign/Doctor/Header';
import Sidebar from '../DashboardDesign/Doctor/Sidebar';
import Home from '../DashboardDesign/Doctor/Home';
import ViewDoctors from '../DashboardDesign/Doctor/ViewDoctors';
import ManagePatients from '../DashboardDesign/Doctor/ManagePatients';
import ViewAppointments from '../DashboardDesign/Doctor/ViewAppointments';
import ViewMedicalRecords from '../DashboardDesign/Doctor/ViewMedicalRecords';
import '../DashboardDesign/Doctor/Dashboard.css';

function DoctorDashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="view-doctors" element={<ViewDoctors />} />
                    <Route path="manage-patients" element={<ManagePatients />} />
                    <Route path="view-appointments" element={<ViewAppointments />} />
                    <Route path="view-medical-records" element={<ViewMedicalRecords />} />
                </Routes>
            </div>
        </div>
    );
}

export default DoctorDashboard;
