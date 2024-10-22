
import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import '../style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Auth = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        confirm_password: '',
        first_name: '',
        last_name: ''
    });
    const [isRegistering, setIsRegistering] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering && formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            let response;
            if (isRegistering) {
               
                response = await registerUser(formData);
                toast.success('Registration successful!');
               
                response = await loginUser({ username: formData.username, password: formData.password });
            } else {
                
                response = await loginUser(formData);
            }

           
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh); 
            localStorage.setItem('username', formData.username);

            
            setTimeout(() => {
                onLogin();
                toast.success('Logged in successfully!');
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data || 'Error occurred during the process';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container">
                <div className="image-div h-100">
                    <img src="https://c0.wallpaperflare.com/preview/271/997/175/application-black-and-white-care-caucasian.jpg" alt="Your Image" className="auth-image" />
                </div>
                <div className="form-div">
                    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                        {isRegistering && (
                            <>
                                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            </>
                        )}
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        {isRegistering && (
                            <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} required />
                        )}
                        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                    </form>
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Auth;
