import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
          Welcome to the Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Overview
            </Typography>
            <Typography variant="body2">
              Manage your profile details and preferences here.
            </Typography>
            <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Typography variant="body2">
              View your recent actions and updates.
            </Typography>
            <Button variant="outlined" color="secondary" style={{ marginTop: '10px' }}>
              View Activity
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Button variant="contained" color="secondary" fullWidth>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
