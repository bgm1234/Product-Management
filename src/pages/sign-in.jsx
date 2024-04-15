import React from "react";
import { Container, Box,Avatar,TextField,Button, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const SingIn = () => {
    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Giriş Yap
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id='identifier'
                    label="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="şifre"
                    type="password"
                    id='password'
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Giriş Yap
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                >
                    Temizle
                </Button>
            </Box>
        </Box>
    </Container>
    )
}

