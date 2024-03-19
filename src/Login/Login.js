import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3001/login', { username, password });
            setIsLoading(false);
            // Redirect to welcome page on successful login
            navigate('/welcome');
        } catch (err) {
            setIsLoading(false);
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Error connecting to the server.");
            }
        }
    };

    return (
        <div>
            <h1>Welcome, please login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={isLoading}>Login</button>
            </form>
            {isLoading ? <div className="spinner"></div> : error && <p>{error}</p>}
        </div>
    );
};

export default Login;
