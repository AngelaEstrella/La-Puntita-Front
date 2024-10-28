import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const message = ['Usuario logueado correctamente', 'Error, Intente de nuevo'];



export default function Validate() {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);

    const [email, setEmail] = useState(""); // Cambiar email a codigo
    const [password, setPassword] = useState(""); // Cambiar password a dni

    const handleCloseAlert = () => {
        setOpenAlert(false);
        navigate('/login');
    };

    const handleErrorAlert = () => {
        setError(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(import.meta.env.VITE_VALIDATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email ? email : "No ingresado", // Cambiar email a codigo
                password: password ? password : "No ingresado" // Cambiar password a dni
            })
        }).then(res =>{
            console.log(res.status)
            if (res.status === 200) {
                setError(false);
            } else {
                setError(true);
                setEmail("");
                setPassword("");
            }
            setOpenAlert(true);
            res.json()
        } 
        ).then(data => {
            console.log(data)
        }).catch(err =>{
            console.log(err)
            setError(true);
        })
    };


    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        // Solo permite números y limita a 8 dígitos
        /*if (/^\d*$/.test(value) && value.length <= 8) { 
            setter(value);
        }*/
    };


    return (
        <Grid container component="main" sx={{ height: { md: '100vh', xs: '100vh' } }}>
            
            
            <Dialog
                open={openAlert}
                onClose={error ? handleErrorAlert : handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">{error ? message[1] : message[0]}</DialogTitle>

                <DialogActions>
                    <Button  
                    onClick={error ? handleErrorAlert : handleCloseAlert}
                    color="primary" autoFocus>
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
                    backgroundImage: `url(${validate})`,
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
                        Valida tu correo electronico
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={codigo.length > 0 && codigo.length < 8}
                            helperText={codigo.length > 0 && codigo.length < 8 ? "Código no válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="codigo" // Cambiar id a codigo
                            label="Código" // Cambiar label a codigo
                            name="codigo" // Cambiar name a codigo
                            autoComplete="codigo" // Cambiar autoComplete a codigo
                            autoFocus
                            value={codigo}
                            onChange={(e) => handleInputChange(e, setEmailS)} // Cambiar setEmail a setCodigo
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Solo permite números
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#66bb6a',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#66bb6a'
                                    },
                                },
                            }}
                        />
                        <TextField
                            error={dni.length > 0 && dni.length < 8}
                            helperText={dni.length > 0 && dni.length < 8 ? "DNI no válido" : ""}
                            margin="normal"
                            required
                            fullWidth
                            name="dni" // Cambiar name a dni
                            label="DNI" // Cambiar label a dni
                            type="text"
                            id="dni" // Cambiar id a dni
                            autoComplete="current-dni" // Cambiar autoComplete a current-dni
                            value={dni}
                            onChange={(e) => handleInputChange(e, setPassword)} // Cambiar setPassword a setDni
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Solo permite números
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#66bb6a',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#66bb6a'
                                    },
                                },
                            }}
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
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}