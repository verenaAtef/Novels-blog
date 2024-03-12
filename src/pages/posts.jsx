import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      toast.error('Error fetching posts:', error);
    }
  };

  const handlePostClick = async (id) => {
    const result = window.confirm("Are you sure you Delete Post?");
    if (result === true) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`);
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
      } catch (error) {
        toast.error('Error deleting post:', error);
      }
    }
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingInline: "20px", marginBottom: "5px", alignItems: "center" }}>
        <h1>Posts</h1>
        <Link to={'/Addpost'} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon style={{ cursor: "pointer", fontSize: "30px" }} icon={faPlusCircle} />
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: "1px solid", width: "25%", padding: "10px", backgroundColor: "white", borderRadius: "20px" }} >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", alignItems: "center" }}>
              <FontAwesomeIcon icon={faTrashAlt} color='red' style={{ cursor: "pointer" }} onClick={() => handlePostClick(post.id)} />
              <Link to={`/Edit/${post.id}`} style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faPenToSquare} />
              </Link>
            </div>
            <div style={{ width: "200px", height: "200px" }}>
              <img src={post.image} alt="" style={{ width: "200px", height: "200px", borderRadius: "10px" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h2 >{post.title}</h2>
              <h4>{post.discription}</h4>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Posts;
