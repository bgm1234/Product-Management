import React, { useCallback, useState, useEffect } from "react";
import { Container, Box, Avatar, Typography, Grid, TextField, Button, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import { useSnackbar } from "notistack";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState([]);


    const registerUser = useCallback(() => {
        axios.post("http://localhost:1337/api/auth/local/register", {
            name: name,
            username: userName,
            email: email,
            isActive: isActive,
            password: password,

        }).then(response => {
            if (response.status === 200) {
                enqueueSnackbar("Kullanıcı eklendi.", { variant: "success" });
               setUser(response.data);
               console.log(response.data);
                clean();
            }
            else {
                console.log("Hata aldık", response.statusText);
            }
        })
    }, [name, userName, email,password,isActive])

    const clean = useCallback(() => {
        setEmail("");
        setName("");
        setPassword("");
        setUserName("");
        setIsActive(true);
    }, [])


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
                    Kayıt Ol
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Kullanıcı Adı"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Adı , Soyadı"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Şifre"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        onClick={registerUser}
                    >
                        Kayıt Ol
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Temizle
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}