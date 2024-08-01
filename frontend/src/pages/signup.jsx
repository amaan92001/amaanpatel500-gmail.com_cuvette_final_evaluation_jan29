import { useState } from 'react';
import axios from '../api/axios';
import back from '../images/arrow_back.png';
import vector from '../images/vector.png';
import circle from '../images/Ellipse2.png';
import bottomcircle from '../images/Ellipse1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);
        try {
            const res = await axios.post('/api/users/register', { username, email, password, confirmPassword });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            toast.success('User Registered Successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            toast.error('User Not Registered. Please try again.');
        }
    };

    return (
        <>
            <div className="login-form">
                <Link to="/"><img className='back-button' src={back} alt="Back" /></Link>
                <div className='signup-inputs'>
                    <img className='right-vector' src={vector} alt="Vector" />
                    <form onSubmit={handleSignUp}>
                        {error && <p className="error">{error}</p>}
                        <label>Username</label> <br />
                        <input
                            className='login-signup-inputs'
                            type="text"
                            placeholder='Enter a username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        /> <br />
                        <label>Email</label> <br />
                        <input
                            className='login-signup-inputs'
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /> <br />
                        <label>Password</label> <br />
                        <input
                            className='login-signup-inputs'
                            type="password"
                            placeholder='****'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /> <br />
                        <label>Confirm Password</label> <br />
                        <input
                            className={`login-signup-inputs ${!passwordsMatch ? 'input-error' : ''}`}
                            type="password"
                            placeholder='****'
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (e.target.value !== password) {
                                    setPasswordsMatch(false);
                                } else {
                                    setPasswordsMatch(true);
                                }
                            }}
                            required
                        />
                        {!passwordsMatch && <p className="error-signup-pass">Passwords do not match</p>}
                        <br />

                        <button className='login-button' type="submit">Sign Up</button> <br />
                        <p className='login-link'>Already have an account? <Link to="/login" className='link-style'><span>Login</span></Link></p>
                    </form>
                    <div>
                        <img className='left-circle' src={circle} alt="Circle" />
                    </div>
                </div>
                <div>
                    <img className='bottom-circle' src={bottomcircle} alt="Bottom Circle" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Signup;
