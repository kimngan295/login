import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const HomeForm = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('userId');
        Cookies.remove('emailOrUsername');
        navigate('/login');
    };

    const logout = () => {
        navigate('/login');
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // để trung tâm dọc
                textAlign: "center", // để trung tâm ngang
                background: "linear-gradient(to right, #18A5A7, #BFFFC7)", // Nền gradient

            }}
        >
            <Typography
                sx={{
                    background: "linear-gradient(45deg, #FFD700 30%, #FF4500 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "3rem",
                    fontWeight: "bold",
                }}
            >
                Welcome to Home Page!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout and delete cookie
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={logout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default HomeForm;