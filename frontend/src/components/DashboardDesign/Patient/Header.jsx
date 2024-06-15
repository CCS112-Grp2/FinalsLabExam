import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import axios from 'axios';
import UserMenu from './UserMenu'; // Import the new UserMenu component
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css'; // Add a CSS file for custom styles

function Header({ OpenSidebar }) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            toast.success('Logout successful!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error('Logout failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <header className='header'>
            <ToastContainer />
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
                <BsSearch className='icon' />
            </div>
            <div className='header-right'>
                <div className='icon-container'>
                    <BsFillBellFill className='icon' />
                    <BsFillEnvelopeFill className='icon' />
                    <div className='user-icon' onClick={() => setShowMenu(!showMenu)}>
                        <BsPersonCircle className='icon' />
                        {showMenu && <UserMenu handleLogout={handleLogout} />}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
