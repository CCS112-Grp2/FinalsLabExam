import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css'; // Add your styles here

function UserMenu({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <div className="user-menu">
            <div className="user-menu-item" onClick={() => navigate('/profile')}>My Account</div>
            <div className="user-menu-item" onClick={() => navigate('/settings')}>Settings</div>
            <div className="user-menu-item" onClick={handleLogout}>Logout</div>
        </div>
    );
}

export default UserMenu;
