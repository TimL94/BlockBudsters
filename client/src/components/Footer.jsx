import * as React from 'react';
import { 
    Box,
    Divider,
    List,
    ListItem,
    Typography,
    Grid
} from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{
                flexGrow: 0, 
                position: 'fixed', 
                bottom: 0, 
                width: '100%'
            }}
        >
            <Divider>
                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 300 }}>
                    603 Bar and Lounge
                </Typography>
            </Divider>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontSize: '0.7rem', fontWeight: 300, mb: 1 }}>
                    Kitchen Hours
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={6}>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Sunday: 11:00am-10:00pm
                            </ListItem>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Monday: Closed
                            </ListItem>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Tuesday: 11:00am-10:00pm
                            </ListItem>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Wednesday: 11:00am-10:00pm
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Thursday: 11:00am-10:00pm
                            </ListItem>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Friday: 11:00am-11:00pm
                            </ListItem>
                            <ListItem sx={{ fontSize: '0.6rem', fontWeight: 300, py: 0.5 }}>
                                Saturday: 11:00am-11:00pm
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Footer;
