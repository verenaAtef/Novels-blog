import * as React from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Icon from '../assets/6895b36e-1a78-49eb-8f62-706e57820424.jpg';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate()
    const validate = () => {
        let result = true
        if (email === "" || email === null) {
            result = false
            toast.warning('Please enter an email');
        } else if (!emailRegex.test(email)) {
            result = false
            toast.error('Please enter a valid email address');
        }
        if (password === "" || password === null) {
            result = false
            toast.warning('Please enter a password');
        } else if (password.length < 8) {
            result = false
            toast.error('Please enter a password with at least 8 characters');
        }
        return result
    }
    const handleSubmit = async () => {
        if (validate()) {
            try {
                const response = await axios.get('http://localhost:3001/user', {
                    params: {
                        email,
                        password
                    }
                });
                if (response.data.length > 0) {
                    toast.success('Login successful');
                    navigate('/Posts')
                } else {
                    toast.error('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again later.');
            }
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", borderRadius: "15px", alignItems: "center", marginTop: "15vh", backgroundColor: "white", gap: "30px", boxShadow: "-5px -5px 10px 0px rgba(0,0,0,0.2)" }}>
            <div style={{ textAlign: "center" }} >
                <p style={{ fontSize: "30px" }}>Login</p>
                <TextField id="outlined-basic" value={email} onChange={e => setEmail(e.target.value)} label="Email" required type='email' variant="outlined" size="small" sx={{ display: "block", marginBottom: "10px" }} />
                <TextField id="outlined-basic" value={password} onChange={e => setPassword(e.target.value)} label="Password" required type='password' variant="outlined" size='small' style={{ display: "block" }} />
                <Button variant="outlined" onClick={handleSubmit} className='btn' style={{ marginTop: "20px", borderRadius: "30px" }}>Login</Button>
                <p>Don't have  an account ? <span><Link to={'/Sign'}>sign up</Link></span></p>
                <ToastContainer />
            </div>
            <div className='img' style={{ width: "40%" }}>
                <img src={Icon} alt="" style={{ width: "400px", height: "450px", borderRadius: "15px" }} />
            </div>
        </div>
    );
}
export default Login;
