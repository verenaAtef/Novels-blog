import * as React from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Addpost() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const validate = () => {
        let result = true;
        if (discription === "" || discription === null) {
            result = false;
            toast.warning('Please enter a description');
        }
        if (title === "" || title === null) {
            result = false;
            toast.warning('Please enter a title');
        }
        return result;
    };

    const navigate = useNavigate();
    const isValidate = async () => {
        if (validate()) {
            try {
                const formData = {
                    title: title,
                    discription: discription,
                    image: selectedFile
                };

                axios.post('http://localhost:3001/posts', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response);
                        navigate('/Posts');
                    })
                    .catch(error => {
                        console.error('An error occurred while processing your request:', error);
                        toast.error('An error occurred while processing your request');
                    });
            } catch (error) {
                toast.error('INVALID DATA');
            }
        }
    };

    return (
        <div className='page' style={{ display: "flex", justifyContent: "center", borderRadius: "15px", alignItems: "center", marginTop: "15vh", backgroundColor: "white", gap: "30px", boxShadow: "-5px -5px 10px 0px rgba(0,0,0,0.2)" }}>
            <div>
                <h2>ADD POSTS</h2>

                <div style={{ textAlign: "center" }} >
                    {selectedFile && <img src={selectedFile} alt="Selected" style={{ maxWidth: "100%", height: "auto", display: "none" }} />}
                    <TextField id="outlined-basic" type="file" style={{ marginBlock: "10px" }} onChange={handleFileChange} />
                    <TextField id="outlined-basic" value={title} onChange={e => setTitle(e.target.value)} label="Title" required type='text' variant="outlined" size='small' style={{ display: "block", marginBottom: "10px" }} />
                    <TextField id="outlined-basic" value={discription} onChange={e => setDiscription(e.target.value)} label="Description" required type='text' variant="outlined" size="small" sx={{ display: "block" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", alignItems: "center" }}>
                        <Link to={'/Posts'} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" style={{ marginTop: "10px", marginBottom: "10px", borderRadius: "30px" }}>Cancel</Button>
                        </Link>
                        <Button variant="outlined" type="submit" onClick={isValidate} style={{ marginTop: "10px", width: "100px", marginBottom: "10px", borderRadius: "30px" }}>Add</Button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Addpost;
