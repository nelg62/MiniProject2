"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUserContext } from "@/context/UserContext";

// Login page component
export default function SignIn() {
  // Deconstruct context from UserContext.jsx
  const {
    currentUser,
    setCurrentUser,
    setUserPassword,
    setUserEmail,
    userEmail,
    userPassword,
    sumbitResult,
    setSubmitResult,
  } = useUserContext();

  // Function to update current user in context
  const handleUpdateUser = (user) => {
    setCurrentUser(user);
  };

  // Handle form submission on login
  const handleSubmitLogin = (event) => {
    event.preventDefault();

    // Validate password
    if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 Characters long");
    } else if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
    } else {
      setSubmitResult("Successful Login");
      handleUpdateUser({ email: userEmail });
    }
  };

  // If currentuser has email display logged in message (currently redirectiong to dashboard via login/page.jsx)
  if (currentUser.email)
    return (
      <>
        <p>Welcome {currentUser.email}!</p>
        <button onClick={() => handleUpdateUser({})}>Log Out</button>
      </>
    );

  // If currentuser does not have an email display the login form
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          color: "black",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitLogin}
          noValidate
          sx={{ mt: 1 }}
        >
          <h1>{sumbitResult}</h1>

          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {/* Sign in Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
