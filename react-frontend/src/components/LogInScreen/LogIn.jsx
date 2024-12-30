import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api';
import './LogIn.css';

const LogInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('access_token', response.access_token);
            console.log('%c' + 'Success LOGIN', 'color:' + 'green');
            setError('');
            navigate('/dashboard');
        } catch (err) {
            console.error('Error during login:', err);
            if (Array.isArray(err.detail)) {
                const messages = err.detail.map((item) => item.msg).join('. ');
                setError(messages);
            } else {
                setError(err.detail || 'Unknown error occurred.');
            }
        }
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span className="focus-border"></span>
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="focus-border"></span>
                </div>
                <div className="input-wrapper">
                    <span>{error}</span>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LogInScreen;
