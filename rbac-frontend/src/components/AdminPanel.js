import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPermissions(response.data.permissions);
      } catch (error) {
        alert('Failed to load permissions.');
      }
    };

    fetchPermissions();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {permissions.map((perm, index) => (
          <li key={index}>{perm}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
