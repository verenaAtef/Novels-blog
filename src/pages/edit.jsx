import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link, useParams } from 'react-router-dom';

function Edit() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchPostDetails();
    }, []);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${id}`);
            const { title, discription, image } = response.data;
            setTitle(title);
            setDiscription(discription);
            setSelectedFile(image);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };
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
                await axios.put(`http://localhost:3001/posts/${id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                toast.success('Post updated successfully');
                navigate('/Posts');
            } catch (error) {
                console.error('An error occurred while processing your request:', error);
                toast.error('An error occurred while processing your request');
            }
        }
    };

    return (
        <div className='page' style={{ display: "flex", justifyContent: "center", borderRadius: "15px", alignItems: "center", marginTop: "15vh", backgroundColor: "white", gap: "30px", boxShadow: "-5px -5px 10px 0px rgba(0,0,0,0.2)" }}>
            <div>
                <h2 style={{ textAlign: "center" }} >UPDATE POST</h2>
                <div style={{ textAlign: "center" }} >
                    {selectedFile && <img src={selectedFile} alt="Selected" style={{ maxWidth: "200px", height: "200px" }} onClick={handleImageClick} />}
                    <input id="fileInput" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                    <TextField id="outlined-basic" value={title} onChange={e => setTitle(e.target.value)} label="Title" required type='text' variant="outlined" size='small' style={{ display: "block", marginBottom: "10px" }} />
                    <TextField id="outlined-basic" value={discription} onChange={e => setDiscription(e.target.value)} label="Description" required type='text' variant="outlined" size="small" sx={{ display: "block" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", alignItems: "center" }}>
                        <Link to={'/Posts'} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" style={{ marginTop: "10px", marginBottom: "10px", borderRadius: "30px" }}>Cancel</Button>
                        </Link>
                        <Button variant="outlined" type="submit" onClick={isValidate} style={{ marginTop: "10px", width: "100px", marginBottom: "10px", borderRadius: "30px" }}>Update</Button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Edit;
