import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsPersonFill,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsFillPersonBadgeFill,
  BsCalendarCheckFill,
  BsFileMedicalFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsPersonFill className="icon_header" /> Doctor
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard" onClick={OpenSidebar}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/manage-patients" onClick={OpenSidebar}>
            <BsPeopleFill className="icon" /> Manage Patients
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/view-appointments" onClick={OpenSidebar}>
            <BsCalendarCheckFill className="icon" /> View Appointments
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/view-doctors" onClick={OpenSidebar}>
            <BsPeopleFill className="icon" /> View Doctors
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/view-medical-records" onClick={OpenSidebar}>
            <BsFileMedicalFill className="icon" /> View Medical Records
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
