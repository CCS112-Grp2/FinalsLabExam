import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../DashboardDesign/Receptionist/Header';
import Sidebar from '../DashboardDesign/Receptionist/Sidebar';
import Home from '../DashboardDesign/Receptionist/Home';
import ViewDoctors from '../DashboardDesign/Receptionist/ViewDoctors';
import ManagePatients from '../DashboardDesign/Receptionist/ManagePatients';
import ScheduleAppointments from '../DashboardDesign/Receptionist/ScheduleAppointments';
import '../DashboardDesign/Receptionist/Dashboard.css';

function ReceptionistDashboard() {
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
                    <Route path="schedule-appointments" element={<ScheduleAppointments />} />
                </Routes>
            </div>
        </div>
    );
}

export default ReceptionistDashboard;
