import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, TextField, Button, Typography, CssBaseline } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dni, setDni] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validaciones
        const correoRegex = /^[\w.%+-]+@gmail\.com$/;
        const telefonoRegex = /^[0-9]{9}$/;
        const contraseñaRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!correoRegex.test(correo)) {
            setError("El correo debe ser de Gmail.");
            return;
        }
        if (!telefonoRegex.test(telefono)) {
            setError("El teléfono debe tener 9 dígitos.");
            return;
        }
        if (!contraseñaRegex.test(contraseña)) {
            setError("La contraseña debe tener al menos 8 caracteres y un número.");
            return;
        }
        if (contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError(null); // Limpia errores previos

        try {
            const response = await axios.post('https://proyecto-pds-24-ii-production.up.railway.app/usuarios', {
                nombre,
                apellidos,
                dni,
                correo,
                telefono,
                direccion,
                contraseña
            });

            if (response.data.success) {
                navigate("/login"); // Redirige a la página de login
            } else {
                setError("Error en el registro, inténtalo de nuevo.");
            }
        } catch (err) {
            setError("Error en el registro, inténtalo de nuevo.");
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} sx={{
                backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
            }} />
            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Registro de Usuario</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField required fullWidth label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} margin="normal" />
                        <TextField required fullWidth label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} margin="normal" />
                        <TextField required fullWidth label="DNI" value={dni} onChange={(e) => setDni(e.target.value)} margin="normal" inputProps={{ maxLength: 8 }} />
                        <TextField required fullWidth label="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} margin="normal" />
                        <Box display="flex">
                            <TextField disabled label="+51" sx={{ width: '60px', marginRight: '8px' }} />
                            <TextField required label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} margin="normal" inputProps={{ maxLength: 9 }} />
                        </Box>
                        <TextField fullWidth label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} margin="normal" />
                        <TextField required fullWidth label="Contraseña" type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} margin="normal" />
                        <TextField required fullWidth label="Confirmar Contraseña" type="password" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} margin="normal" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Registrarse</Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}


/*import React, { useState } from 'react';
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
*/