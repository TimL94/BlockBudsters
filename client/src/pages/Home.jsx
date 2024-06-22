import { Container } from "@mui/material";


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
            <h1>Home</h1>
        </Container>
    )
}

export default Home;
