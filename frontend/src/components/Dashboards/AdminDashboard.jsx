import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../DashboardDesign/Admin/Header';
import Sidebar from '../DashboardDesign/Admin/Sidebar';
import Home from '../DashboardDesign/Admin/Home';
import ViewDoctors from '../DashboardDesign/Admin/ViewDoctors';
import ManagePatients from '../DashboardDesign/Admin/ManageUsers';
import ManageDoctors from '../DashboardDesign/Admin/ManageDoctors';
import ViewAppointments from '../DashboardDesign/Admin/ViewAppointments';
import ViewMedicalRecords from '../DashboardDesign/Admin/ViewMedicalRecords';
import '../DashboardDesign/Admin/Dashboard.css';

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
                    <Route path="view-doctors" element={<ViewDoctors />} />
                    <Route path="manage-users" element={<ManagePatients />} />
                    <Route path="manage-doctors" element={<ManageDoctors />} />
                    <Route path="view-appointments" element={<ViewAppointments />} />
                    <Route path="view-medical-records" element={<ViewMedicalRecords />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;
