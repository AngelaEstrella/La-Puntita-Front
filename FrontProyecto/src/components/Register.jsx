import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const message = ['Usuario registrado correctamente', 'Error al registrar, intente de nuevo'];

export default function Register() {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if (!error) {
            navigate('/login');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
            setOpenAlert(true);
            return;
        }

        fetch(import.meta.env.VITE_REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            if (res.status === 201) {
                setError(false);
            } else {
                setError(true);
            }
            setOpenAlert(true);
            return res.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Grid container component="main" sx={{ height: { md: '100vh', xs: '100vh' } }}>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">{error ? message[1] : message[0]}</DialogTitle>

                <DialogActions>
                    <Button
                        onClick={handleCloseAlert}
                        color="primary" autoFocus
                    >
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/111972/e35e0978eecc828a71c9f269424dc26c6804db3d.XL2.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <Link to={"/"}>
                <IconButton sx={{ position: 'absolute', backgroundColor: { sm: '#DDE2E5' }, color: 'gray', m: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Registro de Usuario
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={email.length > 0 && !isValidEmail(email)}
                            helperText={email.length > 0 && !isValidEmail(email) ? "Debe ser un correo @gmail.com válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                        />
                        <TextField
                            error={password.length > 0 && !isValidPassword(password)}
                            helperText={password.length > 0 && !isValidPassword(password) ? "Mínimo 8 caracteres, al menos 1 letra y 1 número" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                        />
                        <TextField
                            error={confirmPassword.length > 0 && confirmPassword !== password}
                            helperText={confirmPassword.length > 0 && confirmPassword !== password ? "Las contraseñas no coinciden" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => handleInputChange(e, setConfirmPassword)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                            disabled={!isValidEmail(email) || !isValidPassword(password) || confirmPassword !== password}
                        >
                            Registrar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login">
                                    {"¿Ya tienes una cuenta? Inicia sesión"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
