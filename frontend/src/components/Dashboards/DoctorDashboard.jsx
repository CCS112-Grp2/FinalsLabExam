import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../DashboardDesign/Header';
import Sidebar from '../DashboardDesign/Sidebar';
import Home from '../DashboardDesign/Admin/Home';
import ManagePatients from '../DashboardDesign/Admin/ManagePatients';
import ManageDoctors from '../DashboardDesign/Admin/ManageDoctors';
import ViewAppointments from '../DashboardDesign/Admin/ViewAppointments';
import ViewMedicalRecords from '../DashboardDesign/Admin/ViewMedicalRecords';
import '../DashboardDesign/Dashboard.css';

function AdminDashboard() {
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
                    <Route path="manage-patients" element={<ManagePatients />} />
                    <Route path="manage-doctors" element={<ManageDoctors />} />
                    <Route path="view-appointments" element={<ViewAppointments />} />
                    <Route path="view-medical-records" element={<ViewMedicalRecords />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;
