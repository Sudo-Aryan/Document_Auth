import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login1.css';

const Login1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        
    if (!response.ok) { // Check for non-2xx status codes
        alert('Login failed. Please check your username and password.');
        return; // Exit the function if response is not successful
      }
  
      const {user} = await response.json();
      console.log(user)
      if (response.ok) {
        alert('Login Successful');
        if (user.Role === 'ISSUER_ROLE') {
            navigate('/IssueCertificate',{ state: { user: user } });
        } else{
            navigate('/VerifyCertificate',{ state: { user: user } });
        }
        
      } else {
        alert( 'Login failed.');
      }
    };

    const handleUsernameChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="Login1">
            <form onSubmit={handleSubmit} className='form'>
                <h1>Login</h1>
                <div className="input-box1">
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder='Enter email here' 
                        value={email}
                        onChange={handleUsernameChange} 
                        required
                    />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                <div className='account1'>
  Dont have an account?{' '}
  <Link to="/register/issuer" className="text-blue-500" > Sign Up </Link>
 </div>
            </form>
        </div>
    );
};

export default Login1;
