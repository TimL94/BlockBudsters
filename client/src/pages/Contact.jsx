import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import React from 'react';


function Contact() {
    return(
        <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item  md={6} xs={10}>
                    <Typography sx={{ mb: 2, mt: 2, color:'white' }}>
                        <h2>Contact Information</h2>
                    </Typography>
                <Typography variant="body1">Phone: 000-000-0000</Typography>
                <Typography variant="body1">Email: test@test.com</Typography>
                <Typography variant="body1">Address: 000 somthing ST, 00000, ME</Typography>
                </ Grid>    
            </Grid>
        </Box>
    )
}

export default Contact;