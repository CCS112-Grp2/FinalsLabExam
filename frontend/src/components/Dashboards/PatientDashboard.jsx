import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../DashboardDesign/Patient/Header';
import Sidebar from '../DashboardDesign/Patient/Sidebar';
import Home from '../DashboardDesign/Patient/Home';
import ViewDoctors from '../DashboardDesign/Patient/ViewDoctors';
import BookAppointment from '../DashboardDesign/Patient/BookAppointment';
import ManageAppointments from '../DashboardDesign/Patient/ManageAppointments';
import ViewMedicalRecords from '../DashboardDesign/Patient/ViewMedicalRecords';
import '../DashboardDesign/Patient/Dashboard.css';

function PatientDashboard() {
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
                    <Route path="book-appointment" element={<BookAppointment />} />
                    <Route path="manage-appointments" element={<ManageAppointments />} />
                    <Route path="view-medical-records" element={<ViewMedicalRecords />} />
                </Routes>
            </div>
        </div>
    );
}

export default PatientDashboard;
