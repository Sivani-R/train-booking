import React, { useState } from 'react';
import api from '../api';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { username, password });
      alert('Login successful');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className='background-img'>
      <h2 className='heading'>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
