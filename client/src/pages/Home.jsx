import { Card, Container, Grid, CardHeader, CardContent, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import auth from "../utils/auth.js";


function Home() {          
    return(
        <Container
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >

            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} md={10} sx={{textAlign: 'center', mt: 2, color:'white' }} >
                    <Typography sx={{}}><h2>Welcome to BlockBudsters</h2></Typography>
                    <Typography sx={{}}><Divider sx={{ 
                                fontStyle:'italic', 
                                "&::before, &::after": {
                                    borderColor: "white",
                                    }
                                }} 
                                >Medical Cannabis</Divider></Typography>
                    <Typography variant="body1" sx={{ mb: 20, mt: 10, fontStyle:'italic' }}>Dedicated to providing our clients with the highest quality medicinal products</Typography>
                    <Divider sx={{ 
                                fontStyle:'italic', 
                                "&::before, &::after": {
                                    borderColor: "white",
                                    }
                                }} 
                                >New Customer?
                                </Divider>
                    <Typography variant="body1" sx={{ m: 3 }}>Create a new account <Link to='/NewUser' style={{ textDecoration: 'underline'}}>Here!</Link></Typography>
                    <Divider sx={{ 
                                fontStyle:'italic', 
                                "&::before, &::after": {
                                    borderColor: "white",
                                    }
                                }}  
                                >Existing Customer?{isadmin}
                                </Divider>
                    <Typography variant="body1" sx={{ m: 3 }}>View our menu <Link to='/Menu' style={{ textDecoration: 'underline' }}>Here!</Link></Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;
