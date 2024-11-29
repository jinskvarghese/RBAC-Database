import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users.');
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/users/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSnackbar({ open: true, message: 'Role updated successfully', severity: 'success' });
      fetchUsers(); // Refresh user list
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update role', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => handleRoleChange(params.row.id, 'USER')}
          >
            Set as User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleRoleChange(params.row.id, 'ADMIN')}
          >
            Set as Admin
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '80%', margin: '50px auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Panel
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        loading={loading}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
