import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../services/profileService';
import { Box, Typography, TextField, Button, Paper, Grid, Alert } from '@mui/material';

const AdminProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProfile(user.id);
        setProfile(data);
        if (data && data.adminInfo) {
          setFormData({
            fullName: data.adminInfo.fullName || '',
            email: data.adminInfo.email || '',
            phone: data.adminInfo.phone || '',
            role: data.adminInfo.role || ''
          });
        } else {
          setFormData({
            fullName: '',
            email: user.email || '',
            phone: '',
            role: user.role || 'admin'
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const updatedProfile = await updateProfile(user.id, {
        adminInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role || 'admin'
        }
      });
      setProfile(updatedProfile);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Loading profile...</Typography>
        </Paper>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Admin Profile
          </Typography>
          <Typography sx={{ mb: 2 }}>
            No profile information available. Click "Create Profile" to get started.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Create Profile
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Profile
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSave}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={formData.role || ''}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => {
                      setIsEditing(false);
                      // Reset formData if changes are cancelled
                      if (profile && profile.adminInfo) {
                        setFormData({
                          fullName: profile.adminInfo.fullName || '',
                          email: profile.adminInfo.email || '',
                          phone: profile.adminInfo.phone || '',
                          role: profile.adminInfo.role || ''
                        });
                      } else {
                        setFormData({
                          fullName: '',
                          email: user.email || '',
                          phone: '',
                          role: user.role || 'admin'
                        });
                      }
                      setError(null);
                      setSuccessMessage('');
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminProfile; 