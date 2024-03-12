import * as React from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Icon from '../assets/6895b36e-1a78-49eb-8f62-706e57820424.jpg';
import personIcon from '../assets/person-icon-svg-2.jpg';
import Button from '@mui/material/Button';;
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Sign() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false
            toast.warning('Please enter a username');
        } else if (username.length < 3 || username.length > 9) {
            result = false
            toast.error('Please enter a username between 3 and 9 characters');
        }
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
    const navigate = useNavigate()

    const isValidate = async () => {
        if (validate()) {
            try {
                const ISemail = await axios.get(`http://localhost:3001/user?email=${email}`);
                if (ISemail.data.length > 0) {
                    toast.error('Email must be unique')
                } else {
                    const formData = {
                        username: username,
                        email: email,
                        password: password,
                        image: selectedFile
                    };

                    axios.post('http://localhost:3001/user', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response);
                            navigate('/Login');
                        })
                        .catch(error => {
                            console.error('An error occurred while processing your request:', error);
                            toast.error('An error occurred while processing your request');
                        });
                }
            } catch (error) {
                toast.error('INVALID DATA ')
            }
        }
    }
    return (
        <div className='page' style={{ display: "flex", justifyContent: "center", borderRadius: "15px", alignItems: "center", marginTop: "15vh", backgroundColor: "white", gap: "30px", boxShadow: "-5px -5px 10px 0px rgba(0,0,0,0.2)" }}>
            <div style={{ textAlign: "center" }} >
                <label htmlFor="file-upload">
                    <img src={selectedFile || personIcon} alt="" style={{ width: "120px", marginTop: "15px", height: "120px", cursor: "pointer" }} />
                </label>
                <TextField id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                <p style={{ fontSize: "30px" }}>Sign Up</p>
                <TextField id="outlined-basic" value={username} onChange={e => setusername(e.target.value)} label="User Name" required type='text' variant="outlined" size="small" sx={{ display: "block", marginBottom: "10px" }} />
                <TextField id="outlined-basic" value={email} onChange={e => setemail(e.target.value)} label="Email" required type='email' variant="outlined" size="small" sx={{ display: "block", marginBottom: "10px" }} />
                <TextField id="outlined-basic" value={password} onChange={e => setpassword(e.target.value)} label="password " required type='password' variant="outlined" size='small' style={{ display: "block" }} />
                <Button variant="outlined" type="submit" onClick={isValidate} className='btn' style={{ marginTop: "20px", borderRadius: "30px" }}>sign up</Button>
                <p>I have an account ?<span><Link to={'/Login'}>login</Link></span></p>
                <ToastContainer />
            </div>
            <div className='img' style={{ width: "40%" }}>
                <img src={Icon} alt="" style={{ width: "400px", height: "500px", borderRadius: "15px" }} />
            </div>
        </div>
    );
}
export default Sign;
