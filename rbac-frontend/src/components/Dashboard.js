import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! Use the links below to navigate:</p>
      <div style={styles.navContainer}>
        <button style={styles.navButton} onClick={() => navigate('/admin')}>
          Admin Panel
        </button>
        <button style={styles.navButton} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Dashboard;
