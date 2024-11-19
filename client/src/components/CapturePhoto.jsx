import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';

const CapturePhoto = () => {
  const [name, setName] = useState('');
  const [loadingCapture, setLoadingCapture] = useState(false);
  const [loadingRecognition, setLoadingRecognition] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  const handleCapture = async () => {
    if (!name.trim()) {
      setAlert({
        show: true,
        message: 'Please enter a name',
        severity: 'error',
      });
      return;
    }

    setLoadingCapture(true);
    try {
      const response = await axios.post('http://localhost:5000/api/capture', { name });
      setAlert({
        show: true,
        message: response.data.message,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.error || 'Error capturing photos',
        severity: 'error',
      });
    } finally {
      setLoadingCapture(false);
    }
  };

  const handleRecognize = async () => {
    setLoadingRecognition(true);
    try {
      const response = await axios.post('http://localhost:5000/api/recognize');
      setAlert({
        show: true,
        message: response.data.message,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.error || 'Error starting recognition',
        severity: 'error',
      });
    } finally {
      setLoadingRecognition(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Face Management
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter your name and click "Start Capture". Then press 's' to save each photo (5 photos needed) and 'q' to quit.
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        disabled={loadingCapture || loadingRecognition}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleCapture}
          disabled={loadingCapture || loadingRecognition}
          startIcon={loadingCapture && <CircularProgress size={20} color="inherit" />}
        >
          {loadingCapture ? 'Capturing...' : 'Start Capture'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRecognize}
          disabled={loadingCapture || loadingRecognition}
          startIcon={loadingRecognition && <CircularProgress size={20} color="inherit" />}
        >
          {loadingRecognition ? 'Recognizing...' : 'Start Recognition'}
        </Button>
      </Box>
      <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CapturePhoto;
