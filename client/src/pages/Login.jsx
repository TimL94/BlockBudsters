import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Link
} from "@mui/material";


function Login() {
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
                    width: {xs:'75vw', md:'45vw'},
                    textAlign:'center'
                    },
                }}
            >
                <Paper 
                    elevation={24}
                    sx={{ borderRadius:5}}
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
                    >
                        <Box sx={{mb:2}}>
                            <TextField
                            required
                            color="secondary"
                            label="Email"
                            defaultValue=" "
                            focused
                            />
                        </Box>
                        <Box>
                            <TextField
                            required
                            color='secondary'
                            label="Password"
                            defaultValue=" "
                            focused
                            />
                        </Box>
                        <Box sx={{mt:2, mb:3}}>
                            <Button variant="contained" sx={{width:'40%', m: 'auto', borderRadius:5}}>
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