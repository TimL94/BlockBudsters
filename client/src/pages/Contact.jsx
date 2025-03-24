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
                    <Card 
                        sx={{
                            border: 2,
                            borderRadius: 5,
                            minHeight: '200px',
                            mt: 2
                    }}
                        raised= 'true'
                        >
                        <CardHeader title='Store Contact Info' />
                        <CardContent>
                            <Typography variant="body1">Phone: 000-000-0000</Typography>
                            <Typography variant="body1">Email: test@test.com</Typography>
                        </CardContent>
                    </Card>
                </ Grid>    
            </Grid>
        </Box>
    )
}

export default Contact;