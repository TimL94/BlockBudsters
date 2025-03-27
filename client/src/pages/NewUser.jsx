import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Link,
    Typography
  } from "@mui/material";
  import { ADD_USER } from "../utils/mutations";
  import { useMutation } from "@apollo/client";
  import React, { useState } from "react";
  import Auth from "../utils/auth";
  
  function NewUser() {
    const [addUser, { error }] = useMutation(ADD_USER);
    const [formError, setFormError] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email").trim().toLowerCase();
      const password = data.get("password").trim();
      const password2 = data.get("password2").trim();
  
      if (password !== password2) {
        setFormError("Passwords do not match.");
        return;
      }
  
      try {
        const { data: userData } = await addUser({
          variables: { email, password }
        });
  
        if (userData?.addUser?.token) {
          Auth.login(userData.addUser.token);
        } else {
          setFormError("Registration failed. Please try again.");
        }
      } catch (e) {
        console.error("Registration failed:", e);
        setFormError(e.message || "Something went wrong.");
      }
    };
  
    return (
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: { xs: "75vw" },
              maxWidth: 350,
              textAlign: "center"
            }
          }}
        >
          <Paper elevation={24} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 5, border: 1 }}>
            <Typography sx={{ mt: 2 }}>
              <h2>Create New Account</h2>
            </Typography>
            Sign up here!
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                mt: 3,
                display: "flex",
                flexDirection: "column"
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Box sx={{ mb: 2 }}>
                <TextField
                  required
                  color="secondary"
                  label="Email"
                  name="email"
                  type="email"
                  focused
                />
              </Box>
              <Box>
                <TextField
                  required
                  color="secondary"
                  label="Password"
                  name="password"
                  type="password"
                  focused
                />
              </Box>
              <Box>
                <TextField
                  required
                  color="secondary"
                  label="Repeat Password"
                  name="password2"
                  type="password"
                  focused
                />
              </Box>
  
              {formError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {formError}
                </Typography>
              )}
  
              <Box sx={{ mt: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "40%",
                    m: "auto",
                    borderRadius: 5
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                Already have an account?
                <br />
                Sign in <Link href="/Login">Here!</Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  export default NewUser;
  