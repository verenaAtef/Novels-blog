
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Sign from './pages/signup';
import Posts from './pages/posts';
import Addpost from './pages/addpost';
import Edit from './pages/edit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path='/' element={<Sign />} />
          <Route path="/edit/:id" element={<Edit />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

