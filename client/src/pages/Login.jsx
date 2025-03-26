import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Link
} from "@mui/material";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from '@apollo/client';
import React from "react";
import Auth from "../utils/auth";


function Login() {
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleSubmit = async (event) => { 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email").trim().toLowerCase();
        const password = data.get("password").trim();
      
        console.log(`email: ${email} | password: ${password}`);
      
        try {
          const { data: userData } = await login({
            variables: { email, password }
          });
      
      
          if (userData?.login?.token) {
            console.log("Token received:", userData.login.token);
            Auth.login(userData.login.token);
          } else {
            console.error("Login mutation returned no token.");
          }
        } catch (e) {
          console.error("Login failed:", e);
          if (e.graphQLErrors) {
            console.error("GraphQL errors:", e.graphQLErrors);
          }
        }
      };

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
                    sx={{ borderRadius:5, border:1}}
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
                                defaultValue=""
                                focused
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                color='secondary'
                                label="Password"
                                name="password"
                                type="password"
                                defaultValue=""
                                focused
                            />
                        </Box>
                        <Box sx={{mt:2, mb:3}}>
                            <Button 
                                variant="contained"
                                sx={{
                                    width:'40%',
                                    m: 'auto',
                                    borderRadius:5
                                }} 
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                        <Box sx={{mb:2}}>
                            Don't have an account?<br></br>
                            Sign up <Link href='/NewUser'>Here!</Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default Login;