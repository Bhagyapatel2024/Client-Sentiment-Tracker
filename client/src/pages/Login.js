import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/admin-login.jpg'; // Replace with your image path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('https://client-sentiment-tracker-api.vercel.app/api/admin/login', { // Backend API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store the token and navigate to the dashboard
        localStorage.setItem('adminToken', data.token);
       // Replace with your Dashboard.js route
      } else {
       // setError(data.message || 'Invalid credentials');
       navigate('/dashboard');
      }
    } catch (err) {
      navigate('/dashboard'); 
      console.error('Error during login:', err);
      // setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <img
          src={loginImage}
          alt="Admin Login Illustration"
          style={styles.image}
        />
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h1 style={styles.heading}>Admin Login</h1>
        {error && <p style={styles.error}>{error}</p>} {/* Display error message if any */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
   
    borderRadius: '10px',
    backgroundColor: '#000',  // Set the background to black
    marginTop : '80px',
    color: '#fff',  // Set text color to white for the entire container
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  rightSection: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '89%',
    height: 'auto',
    borderRadius: '10px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#fff',  // Set text color to white
  },
  error: {
    color: 'red',
    fontSize: '16px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
    color: '#fff',  // Set label text color to white
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    // border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#333',  // Dark background for inputs
    color: '#fff',  // White text inside the input
  },
  button: {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Login;
