import { useState } from 'react';
import axios from '../api/axios';
import back from '../images/arrow_back.png';
import vector from '../images/vector.png';
import circle from '../images/Ellipse2.png';
import bottomcircle from '../images/Ellipse1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isInvalid, setIsInvalid] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            toast.success('Login Successful!');
            setIsInvalid(false); 
            setTimeout(() => {
                navigate('/formdashboard');
            }, 2000); 
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
            setIsInvalid(true); 
            toast.error('Login Failed: Invalid email or password');
        }
    };

    return (
        <div className="login-form">
            <Link to="/"><img className='back-button' src={back} alt="Back" /></Link>
            <div className='form-inputs'>
                <img className='right-vector' src={vector} alt="Vector" />
                <form onSubmit={handleLogin}> 
                    <label>Email</label> <br />
                    <input
                        className={`login-signup-inputs ${isInvalid ? 'input-error' : ''}`}
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> <br />
                    <label>Password</label> <br />
                    <input
                        className={`login-signup-inputs ${isInvalid ? 'input-error' : ''}`}
                        type="password"
                        placeholder='**********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /> <br />
                    <button className='login-button' type="submit">Log In</button> <br />
                    <p className='register-link'>Don’t have an account? <Link to="/signup" className='link-style'><span className="link"> Register now </span></Link></p>
                </form>
                <div>
                    <img className='left-circle' src={circle} alt="Circle" />
                </div>
            </div>
            <div>
                <img className='bottom-circle' src={bottomcircle} alt="Bottom Circle" />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
