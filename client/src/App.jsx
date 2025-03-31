import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import Footer from './components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './app.css';
import theme from './utils/theme.js';



function App() {
  const [ isVerified,setIsVerified ] = useState(null);
  const [ loading, setLoading] = useState(true);

 

  useEffect(() => {
    const storedStatus = localStorage.getItem('isVerified');
    const verifiedAt = localStorage.getItem('verifiedAt');
  
    

    if (storedStatus && verifiedAt) {
      const now = Date.now();
      const then = parseInt(verifiedAt, 10);
      const minutesPassed = (now - then) / (1000 * 60);
  
      // Expire "No" answer after 1 minute
      if (storedStatus === 'false' && minutesPassed > 1) {
        localStorage.removeItem('isVerified');
        localStorage.removeItem('verifiedAt');
        setIsVerified(null);
      }
      // Expire any answer after 30 minutes
      else if (minutesPassed > 30) {
        localStorage.removeItem('isVerified');
        localStorage.removeItem('verifiedAt');
        setIsVerified(null);
      }
      // ✅ Still valid → set based on storedStatus
      else {
        setIsVerified(storedStatus === 'true');
      }
    } else {
      // First time visit or no data saved
      setIsVerified(null);
    }

    setLoading(false);
  }, []);

  const handleYes = () => {
    localStorage.setItem('isVerified', 'true');
    localStorage.setItem('verifiedAt', Date.now().toString());
    setIsVerified(true);
  }

  const handleNo = () => {
    localStorage.setItem('isVerified', 'false');
    localStorage.setItem('verifiedAt', Date.now().toString());
    setIsVerified(false);
  }

  if (loading) {
    return null; 
  };

  if (isVerified === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
        <Card 
        sx={{ 
          maxWidth: '75vw', 
          p: 2, 
          border: 2,
          borderRadius: 2.5
          }} 
          elevation={24}
          >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Are you 21 years of age or older?
            </Typography>
            <Button onClick={handleYes} variant="contained" sx={{
               m: 1,
               backgroundColor: '#006400',
                                    '&:hover': {
                                            backgroundColor: '#004d00', // even darker on hover
                                    },
              color: 'white',
               }}>
              Yes
            </Button>
            <Button onClick={handleNo} variant="outlined" sx={{
               m: 1,
               backgroundColor: '#006400',
                                    '&:hover': {
                                            backgroundColor: '#004d00', // even darker on hover
                                    },
              color: 'white',
               }}>
              No
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (isVerified === false) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '10%' }}
        >
        <Card 
        sx={{ 
          maxWidth: '75vw', 
          p: 2,
          border: 2,
          borderRadius: 2.5, 
          }} 
          elevation={24}
          >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" color="error">
              You must be 21 or over to access this site.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{p:0, m:0, display:'flex', flexDirection:'column', height:'80vh', color:'white'}} boxSizing='border-box'>
        <Navbar />
        <div>
          <Outlet sx={{ mb:20 }}/>
        </div>
        <Footer/>
      </Box>
    </ThemeProvider>
  )
}

export default App
