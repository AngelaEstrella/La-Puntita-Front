import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";

const message = ['Usuario registrado correctamente', 'Error en el registro. Por favor, inténtelo de nuevo.'];
const url = "https://proyecto-pds-24-ii-production.up.railway.app/usuario";

export default function Register() {
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [reference, setReference] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if (!error) {
            navigate('/login');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
            setOpenAlert(true);
            return;
        }

        const userData = {
            nombre: firstName.trim(),
            apellido: lastName.trim(),
            dni: dni.trim(),
            telefono: phone.trim(),
            direccion: address.trim(),
            referencia: reference.trim() || "",
            email: email.trim(),
            passw: password.trim(),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                throw new Error(errorData.detail || "Error desconocido");
            }

            const data = await response.json();
            console.log("Usuario registrado:", data);
            setError(false);
            setOpenAlert(true);
        } catch (err) {
            console.error("Error en el registro:", err.message);
            setError(true);
            setOpenAlert(true);
        }
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const isValidDNI = (dni) => /^\d{8}$/.test(dni);
    const isValidPhone = (phone) => /^\d{9}$/.test(phone);
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {error ? message[1] : message[0]}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary" autoFocus>
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
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/111972/e35e0978eecc828a71c9f269424dc26c6804db3d.XL2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <Link to={"/"}>
                <IconButton sx={{ position: 'absolute', backgroundColor: '#DDE2E5', color: 'gray', m: 2 }}>
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
                            margin="normal"
                            required
                            fullWidth
                            label="Nombre"
                            value={firstName}
                            onChange={(e) => handleInputChange(e, setFirstName)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Apellido"
                            value={lastName}
                            onChange={(e) => handleInputChange(e, setLastName)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="DNI"
                            error={dni && !isValidDNI(dni)}
                            helperText={dni && !isValidDNI(dni) ? "Debe ser un DNI válido de 8 dígitos" : ""}
                            value={dni}
                            onChange={(e) => handleInputChange(e, setDni)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Teléfono"
                            error={phone && !isValidPhone(phone)}
                            helperText={phone && !isValidPhone(phone) ? "Debe ser un teléfono válido de 9 dígitos" : ""}
                            value={phone}
                            onChange={(e) => handleInputChange(e, setPhone)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Dirección"
                            value={address}
                            onChange={(e) => handleInputChange(e, setAddress)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Referencia (Opcional)"
                            value={reference}
                            onChange={(e) => handleInputChange(e, setReference)}
                        />
                        <TextField
                            error={email && !isValidEmail(email)}
                            helperText={email && !isValidEmail(email) ? "Debe ser un correo @gmail.com válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            label="Correo Electrónico"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                        />
                        <TextField
                            error={password && !isValidPassword(password)}
                            helperText={password && !isValidPassword(password) ? "Mínimo 8 caracteres, al menos 1 letra y 1 número" : ""}
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                        />
                        <TextField
                            error={confirmPassword && confirmPassword !== password}
                            helperText={confirmPassword && confirmPassword !== password ? "Las contraseñas no coinciden" : ""}
                            margin="normal"
                            required
                            fullWidth
                            label="Confirmar Contraseña"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => handleInputChange(e, setConfirmPassword)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                            disabled={
                                !isValidDNI(dni) || !isValidPhone(phone) ||
                                !isValidEmail(email) || !isValidPassword(password) ||
                                confirmPassword !== password
                            }
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

