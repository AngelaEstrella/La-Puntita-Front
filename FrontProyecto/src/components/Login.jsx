import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Password } from '@mui/icons-material';

const message = ['Usuario logueado correctamente', 'Error, Intente de nuevo'];
const url="https://proyecto-pds-24-ii-production.up.railway.app/usuarios";

export default function Login() {

    const [isMod, setIsMod] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [correo, setCorreo] = useState(""); // Cambiar código a correo
    const [contraseña, setContraseña] = useState(""); // Cambiar dni a contraseña
    const [error, setError] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleCheckboxChange = (event) => {
        setIsMod(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(correo, contraseña);

        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: correo,
                passw: contraseña
            })
        }).then(res => 
            res.json()
        ).then(data => {
            console.log(data.usuarios)
       
            setOpenAlert(true);
    
        })
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <Grid container component="main" sx={{ height: { md: '100vh', xs: '100vh' } }}>
            <Dialog
                open={openAlert}
                onClose={error ? () => setOpenAlert(false) : handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">{error ? message[1] : message[0]}</DialogTitle>

                <DialogActions>
                    <Button onClick={error ? () => setOpenAlert(false) : handleCloseAlert} color="primary" autoFocus>
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
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
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
                        Iniciar sesión
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField

                            error={correo.length === 0}
                            helperText={correo.length === 0 ? "Correo no válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="correo" // Cambiar id a correo
                            label="Correo" // Cambiar label a correo
                            name="correo" // Cambiar name a correo
                            autoComplete="email" // Cambiar autoComplete a email
                            autoFocus
                            value={correo}
                            onChange={(e) => handleInputChange(e, setCorreo)} // Cambiar setCodigo a setCorreo
                        />
                        <TextField
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="contraseña" // Cambiar name a contraseña
                            label="Contraseña" // Cambiar label a contraseña
                            type="password" // Cambiar type a password
                            id="contraseña" // Cambiar id a contraseña
                            autoComplete="current-password" // Cambiar autoComplete a current-password
                            value={contraseña}
                            onChange={(e) => handleInputChange(e, setContraseña)} // Cambiar setDni a setContraseña
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                        >
                            Autenticar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/validate">
                                    {"No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
/*
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
import { login } from '../services/autenticacion'; // Importa la función de autenticación

const messages = ['Usuario logueado correctamente', 'Error, intente de nuevo'];

export default function Login() {
    const [openAlert, setOpenAlert] = useState(false);
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Llama a la función de autenticación con los nombres correctos
            const data = await login(correo, contraseña); // Asegúrate de que correspondan a email y passw en la API
            if (data.success) { // Ajusta según el formato de respuesta de tu API
                setError(false);
                setOpenAlert(true);
                navigate("/"); // Redirige al inicio después del inicio de sesión exitoso
            } else {
                setError(true);
                setOpenAlert(true);
            }
        } catch (err) {
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
                <DialogTitle id="alert-dialog-title">{error ? messages[1] : messages[0]}</DialogTitle>
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
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <Link to="/">
                <IconButton sx={{ position: 'absolute', backgroundColor: '#DDE2E5', color: 'gray', m: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Iniciar sesión</Typography>
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
                            autoComplete="current-password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                        >
                            Autenticar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/validacion">
                                    {"¿No tienes una cuenta? Regístrate"}
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

/*Version 1.2

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

const messages = ['Usuario logueado correctamente', 'Error, intente de nuevo'];

export default function Login() {
    const [openAlert, setOpenAlert] = useState(false);
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(correo, contraseña);
        setOpenAlert(true);
        setError(correo.length === 0 || contraseña.length === 0);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{error ? messages[1] : messages[0]}</DialogTitle>
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
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <Link to="/">
                <IconButton sx={{ position: 'absolute', backgroundColor: '#DDE2E5', color: 'gray', m: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Iniciar sesión</Typography>
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
                            autoComplete="current-password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                        >
                            Autenticar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/validate">
                                    {"¿No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}



/*VERSION ANTES DE LOS CAMBIOS:
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const message = ['Usuario logueado correctamente', 'Error, Intente de nuevo'];


export default function Login() {
    
    const [isMod, setIsMod] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [correo, setCorreo] = useState(""); // Cambiar código a correo
    const [contraseña, setContraseña] = useState(""); // Cambiar dni a contraseña
    const [error, setError] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleCheckboxChange = (event) => {
        setIsMod(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(correo, contraseña);
       
        
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <Grid container component="main" sx={{ height: { md: '100vh', xs: '100vh' } }}>
            <Dialog
                open={openAlert}
                onClose={error ? () => setOpenAlert(false) : handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">{error ? message[1] : message[0]}</DialogTitle>

                <DialogActions>
                    <Button onClick={error ? () => setOpenAlert(false) : handleCloseAlert} color="primary" autoFocus>
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
                    backgroundImage: 'url(https://cuponassets.cuponatic-latam.com/backendPe/uploads/imagenes_descuentos/112015/6970a428ea729716bb0cc2b968be11f4f0ccbc06.XL2.jpg)',
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
                        Iniciar sesión
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField

                            error={correo.length === 0}
                            helperText={correo.length === 0 ? "Correo no válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="correo" // Cambiar id a correo
                            label="Correo" // Cambiar label a correo
                            name="correo" // Cambiar name a correo
                            autoComplete="email" // Cambiar autoComplete a email
                            autoFocus
                            value={correo}
                            onChange={(e) => handleInputChange(e, setCorreo)} // Cambiar setCodigo a setCorreo
                        />
                        <TextField
                            error={contraseña.length === 0}
                            helperText={contraseña.length === 0 ? "Contraseña no válida" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="contraseña" // Cambiar name a contraseña
                            label="Contraseña" // Cambiar label a contraseña
                            type="password" // Cambiar type a password
                            id="contraseña" // Cambiar id a contraseña
                            autoComplete="current-password" // Cambiar autoComplete a current-password
                            value={contraseña}
                            onChange={(e) => handleInputChange(e, setContraseña)} // Cambiar setDni a setContraseña
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#66bb6a' } }}
                        >
                            Autenticar
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/validate">
                                    {"No tienes una cuenta? Regístrate"}
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