import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Paper, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const messages = ['Registro exitoso', 'Error en el registro, intente de nuevo'];

export default function Register() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [error, setError] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if (!error) {
            navigate('/'); // Redirige al inicio después del registro exitoso
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (contraseña !== confirmarContraseña) {
            setError(true);
            setOpenAlert(true);
            return;
        }

        if (correo.length > 0 && contraseña.length > 0) {
            setError(false);
            setOpenAlert(true);
            // Aquí puedes añadir la lógica de registro, como enviar datos a la API
        } else {
            setError(true);
            setOpenAlert(true);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {error ? messages[1] : messages[0]}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary" autoFocus>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid item xs={false} sm={4} md={7} sx={{
                backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
            }} />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Regístrate</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="correo"
                            label="Correo"
                            autoComplete="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            error={correo.length === 0}
                            helperText={correo.length === 0 ? "Correo no válido" : ""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="contraseña"
                            label="Contraseña"
                            type="password"
                            id="contraseña"
                            autoComplete="new-password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmarContraseña"
                            label="Confirmar Contraseña"
                            type="password"
                            id="confirmarContraseña"
                            autoComplete="new-password"
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                            error={contraseña !== confirmarContraseña}
                            helperText={contraseña !== confirmarContraseña ? "Las contraseñas no coinciden" : ""}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
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
