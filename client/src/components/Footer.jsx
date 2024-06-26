import * as React from 'react';
import { 
    Box,
    Divider,
    List,
    ListItem,
    Typography,
    Grid,
    Container
} from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{
                flexGrow: 0, 
                width: '100%',
                mt: 2,
                mb: 2,
                py: 2,
                position: 'relative'
            }}
        >
            <Divider>
                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 300 }}>
                    603 Bar and Lounge
                </Typography>
            </Divider>
            <Container>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontSize: '0.7rem', fontWeight: 300, mb: 1 }}>
                        Kitchen Hours
                    </Typography>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
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
                        <Grid item>
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
            </Container>
        </Box>
    )
}

export default Footer;
