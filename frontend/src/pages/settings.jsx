import usericon from '../images/user.png';
import lockicon from '../images/lock.png';
import eyeicon from '../images/eye.png';
import logouticon from '../images/logout.png';
import { useState } from 'react';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import { BsEyeSlash } from "react-icons/bs";
import 'react-toastify/dist/ReactToastify.css';


function SettingsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showEmail, setShowEmail] = useState(true);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put('/api/users/update', { name, email, oldPassword, newPassword }, config);
            toast.success('Profile updated successfully!');
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            toast.error('An error occurred while updating profile.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        toast.info('You have been logged out.');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    };

    return (
        <>
            <div className="settings-page">
                <form className="settings-form" onSubmit={handleUpdate}>
                    <p className="settings-title">Settings</p>
                    <div className='settings-text-input'>
                        <div>
                            <img src={usericon} alt="User Icon" />
                        </div>
                        <input
                            className="settings-text-input-box"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                    </div>

                    <div className="settings-email-input">
                        <img src={lockicon} alt="Lock Icon" />
                        <input
                            className="settings-email-input-box"
                            type={showEmail ? "text" : "password"}
                            placeholder="Update Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        {showEmail ? (
                            <img
                                className='eye-icon-email'
                                src={eyeicon}
                                alt="Eye Icon"
                                onClick={() => setShowEmail(!showEmail)}
                            />
                        ) : (
                            <BsEyeSlash
                                className='eye-icon-email'
                                onClick={() => setShowEmail(!showEmail)}
                            />
                        )}
                    </div>

                    <div className="settings-password-input">
                        <img src={lockicon} alt="Lock Icon" />
                        <input
                            className="settings-password-input-box"
                            placeholder="Old Password"
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <br />
                        {showOldPassword ? (
                            <img
                                className='eye-icon-password'
                                src={eyeicon}
                                alt="Eye Icon"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            />
                        ) : (
                            <BsEyeSlash
                                className='eye-icon-password'
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            />
                        )}
                    </div>

                    <div className="settings-new-password-input">
                        <img src={lockicon} alt="Lock Icon" />
                        <input
                            className="settings-new-password-input-box"
                            placeholder="New Password"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <br />
                        {showNewPassword ? (
                           <img
                                className='eye-icon-new-password'
                                src={eyeicon}
                                alt="Eye Icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                        ) : (
                            <BsEyeSlash
                                className='eye-icon-new-password'
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                        )}
                    </div>
                    <div>
                        <button className="settings-update-button">Update</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </form>
                <div className='settings-page-logout'></div>
                <div className='logout-box' onClick={handleLogout}>
                    <img src={logouticon} alt="Logout Icon" />
                    <p className='settings-logout-text'>Logout</p>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SettingsPage;
