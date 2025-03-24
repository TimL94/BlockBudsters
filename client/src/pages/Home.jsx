import { Card, Container, Grid, CardHeader, CardContent, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";


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
            <Typography sx={{ mt: 2 }}><h1>Welcome to BlockBudsters</h1></Typography>
            <Typography sx={{}}><h3>Medical Cannabis</h3></Typography>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} md={10} sx={{textAlign: 'center', mt: 2}} >
                    <Typography variant="body1" sx={{ mb: 20, mt: 10 }}>Dedicated to providing our clients with the highest quality medicinal products</Typography>
                    <Divider>New Customer?</Divider>
                    <Typography variant="body1" sx={{ m: 3 }}>Create a new account <Link to='/Login' style={{ textDecoration: 'underline'}}>Here!</Link></Typography>
                    <Divider>Existing Customer?</Divider>
                    <Typography variant="body1" sx={{ m: 3 }}>View our menu <Link to='/Menu' style={{ textDecoration: 'underline' }}>Here!</Link></Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;
