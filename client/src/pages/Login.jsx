import { Container } from "@mui/material";


function Login() {
    return(
        <Container
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Login</h1>
        </Container>
    )
}

export default Login;