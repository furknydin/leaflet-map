import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import MapComponent from './MapComponent';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://your-backend-api.com/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Başarılı giriş sonrası yapılacak işlemler
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    // Google login sonrası yapılacak işlemler
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
    setError('Google ile giriş başarısız.');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Giriş Yap</button>
        </form>
        <div className="social-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </div>
      <div className="login-image">
        <MapComponent />
      </div>
    </div>
  );
}

export default Login; 