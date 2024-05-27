import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom'
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
} from "@mui/material";


axios.defaults.baseURL = "http://localhost:3000"

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    // Load Google Sign-In client script asynchronously
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Handle script load error
    script.onerror = () => {
      console.error("Error loading Google Sign-In script");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: "30499313095-lnnlp1tpghauo9ns0c9tcfr9jn6pcebl.apps.googleusercontent.com",
      });

      auth2.signIn().then(googleUser => {
        const profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId());
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
        alert("Login successful")
      }).catch(error => {
        console.error("Google Sign-In Error:", error);
      });
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!emailOrUsername) {
      setEmailError("Username or email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      const userId = Cookies.get('userId');
      if (userId) {
        alert('User is already logged in');
        navigate('/home')
      }

      console.log({ emailOrUsername, password, userId });
    }

    const data = {
      emailOrUsername: event.target.emailOrUsername.value,
      password: event.target.password.value
    };

    console.log('data: ' + data.emailOrUsername + ' ' + data.password);
    // console.log('userdata: ' + userData)


    // Gửi yêu cầu POST đến backend
    axios.post('/login', data)
      .then((response) => {
        console.log('response: ' + response.data.success)
        if (rememberMe && response.data.success) {
          const userData = {
            emailOrUsername: data.emailOrUsername,
            userId: response.data.user._doc._id,
          };

          Cookies.set('userId', userData.userId, { expires: 1 });
          Cookies.set('emailOrUsername', userData.emailOrUsername, { expires: 1 });

        }
        navigate('/home');
        
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message);

      });
  };


  return (
    <>
      <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="30499313095-lnnlp1tpghauo9ns0c9tcfr9jn6pcebl.apps.googleusercontent.com"></meta>
      </Helmet>
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
        <Box
          sx={{
            padding: "30px",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid #00CC00",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="emailOrUsername"
              label="Email or Username"
              name="emailOrUsername"
              autoComplete="emailOrUsername"
              autoFocus
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Box
              sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            >
              <FormControlLabel
                sx={{ display: "flex", fontSize: "16px" }}
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    name="rememberMe"
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ fontSize: "16px", bold: true }}>
                    Remember Me
                  </Typography>
                }
              />
              <Typography sx={{ pl: "28%", fontSize: "16px" }}>
                <Link
                  href="#"
                  sx={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ justifyContent: "center", display: "center" }} >
              <Typography sx={{ pt: "10px", pb: "10px", fontSize: "16px", justifyContent: "center" }}>
                or login with
              </Typography>
            </Box>
            <Box sx={{ justifyContent: "center", display: "center" }} >
              <IconButton>
                <FacebookIcon sx={{ fontSize: "32px", color: "#1877F2" }} />
              </IconButton>
              {/* <IconButton>
                <div className="g-signin2" data-onsuccess={onSignIn} style={{ width: '32px', height: '32px' }}></div>
              </IconButton> */}
              <IconButton onClick={handleGoogleSignIn}>

                <FcGoogle
                  style={{
                    fontSize: "32px",
                    color: "#DB4437",
                    paddingLeft: "10px",
                  }}
                />
              </IconButton>
              <IconButton>
                <GitHubIcon
                  sx={{ fontSize: "32px", color: "#333333", marginLeft: "10px" }}
                />
              </IconButton>
            </Box>
            <Box sx={{ justifyContent: "center", display: "center" }}>
              <Typography sx={{ pt: "5px" }}>
                <Link
                  href="#"
                  sx={{
                    pt: "10px",
                    textDecoration: "none",
                    fontSize: "16px",
                    color: "black",
                  }}
                >
                  Not registered? Create account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
