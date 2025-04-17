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
const textStyles = { fontSize: '0.6rem', fontWeight: 300, py: 0.5 };

    return (
        <Box 
            sx={{
                flexGrow: 0, 
                width: '100%',
                mt: 2,
                mb: 2,
                py: 2,
                position: 'relative',
                color: 'white',
            }}
        >
            <Divider
                sx={{
                    "&::before, &::after": {
                    borderColor: "white",
                    }
              }}
              >
                <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 300 }}>
                    Block Budsters
                </Typography>
            </Divider>
            <Container>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontSize: '0.7rem', fontWeight: 300, mb: 1 }}>
                        Store Hours
                    </Typography>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <List sx={{ p: 0 }}>
                                <ListItem sx={textStyles}>
                                    Sunday: TBD
                                </ListItem>
                                <ListItem sx={textStyles}>
                                    Monday: TBD
                                </ListItem>
                                <ListItem sx={textStyles}>
                                    Tuesday: TBD
                                </ListItem>
                                <ListItem sx={textStyles}>
                                    Wednesday: TBD
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item>
                            <List sx={{ p: 0 }}>
                                <ListItem sx={textStyles}>
                                    Thursday: TBD
                                </ListItem>
                                <ListItem sx={textStyles}>
                                    Friday: TBD
                                </ListItem>
                                <ListItem sx={textStyles}>
                                    Saturday: TBD
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
