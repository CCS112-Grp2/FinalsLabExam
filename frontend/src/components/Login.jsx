// src/Login.jsx

import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="box">
            <div className="container">
                <div className="top-header">
                    <span>Have an account?</span>
                    <header>Login</header>
                </div>

                <div className="input-field">
                    <input type="text" className="input" placeholder="Username" required />
                    <i className="bx bx-user"></i>
                </div>
                <div className="input-field">
                    <input type="password" className="input" placeholder="Password" required />
                    <i className="bx bx-lock-alt"></i>
                </div>
                <div className="input-field">
                    <input type="submit" className="submit" value="Login" />
                </div>

                <div className="bottom">
                    <div className="left">
                        <input type="checkbox" id="check" />
                        <label htmlFor="check"> Remember Me</label>
                    </div>
                    <div className="right">
                        <label><a href="#">Forgot password?</a></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
