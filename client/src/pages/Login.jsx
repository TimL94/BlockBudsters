import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Link
} from "@mui/material";


function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password")


        console.log(`email: ${email} | password: ${password}`)
    }

    return(
        <Container
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2
            }}
        >
             <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: {xs:'75vw'},
                    maxWidth:350,
                    textAlign:'center'
                    },
                }}
            >
                <Paper 
                    elevation={24}
                    sx={{ borderRadius:5, border:.01}}
                >
                    <h2>
                        Login
                    </h2>
                    Sign in here!
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            mt:3,
                            display:'flex',
                            flexDirection: 'column'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Box sx={{mb:2}}>
                            <TextField
                            required
                            color="secondary"
                            label="Email"
                            name='email'
                            defaultValue=" "
                            focused
                            />
                        </Box>
                        <Box>
                            <TextField
                            required
                            color='secondary'
                            label="Password"
                            name="password"
                            defaultValue=" "
                            focused
                            />
                        </Box>
                        <Box sx={{mt:2, mb:3}}>
                            <Button variant="contained" sx={{width:'40%', m: 'auto', borderRadius:5}} type="submit">
                                Submit
                            </Button>
                        </Box>
                        <Box sx={{mb:2}}>
                            Don't have an account?<br></br>
                            Sign up <Link>Here!</Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default Login;