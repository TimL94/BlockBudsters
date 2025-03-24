import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Footer from './components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './app.css';



function App() {
  const [ isVerified,setIsVerified ] = useState(null);

  useEffect(() => {
    const storedStatus = localStorage.getItem('isVerified');
    const verifiedAt = localStorage.getItem('verifiedAt');
    if (storedStatus && verifiedAt) {
      const now = Date.now();
      const then = parseInt(verifiedAt, 10);
      const minutePassed = (now - then) / (1000 * 60 );

      if (minutePassed < 1 && storedStatus === 'false') {
        setIsVerified(storedStatus === 'true');
      } else {
        localStorage.removeItem('isVerified');
        localStorage.removeItem('verifiedAt');
        setIsVerified(null);
      }
    if (minutePassed > 30) {
      localStorage.removeItem('isVerified');
      localStorage.removeItem('verifiedAt');
      setIsVerified(null);
    }
  }

  }, [])

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

  if (isVerified === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
        <Card 
        sx={{ 
          maxWidth: 400, 
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
            <Button onClick={handleYes} variant="contained" color="primary" sx={{ m: 1 }}>
              Yes
            </Button>
            <Button onClick={handleNo} variant="outlined" color="secondary" sx={{ m: 1 }}>
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
          maxWidth: 400, 
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
    <Box sx={{p:0, m:0, display:'flex', flexDirection:'column', height:'80vh'}} boxSizing='border-box'>
      <Navbar />
      <div>
        <Outlet sx={{ mb:20 }}/>
      </div>
      <Footer/>
    </Box>
  )
}

export default App
