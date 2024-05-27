import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // State để lưu thông báo lỗi
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsAcceptedError, setTermsAcceptedError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    if (!firstName) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!termsAccepted) {
      setTermsAcceptedError("Please accept the Terms of Use & Privacy Policy");
      valid = false;
    } else {
      setTermsAcceptedError("");
    }

    
  };

  return (
    <Container
      component="main"
      maxWidth="sx"
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #18A5A7, #BFFFC7)",
      }}
    >
      <Container sx={{ width: "40%" }}>
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid #00CC00",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              fullWidth
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              fullWidth
              error={!!lastNameError}
              helperText={lastNameError}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              fullWidth
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label="I accept the Terms of Use & Privacy Policy."
            />
            {termsAcceptedError && (
              <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2 }}>
                {termsAcceptedError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Register Now
            </Button>
            <Typography sx={{ pt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login" sx={{ textDecoration: "none" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default RegisterForm;