import React from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";

const MiCuenta = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        
        <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src="https://via.placeholder.com/100"
            alt="Foto de perfil"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="subtitle1" sx={{ marginTop: "8px" }}>
            Foto de perfil
          </Typography>
        </Box>

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            Quitar foto
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Cambiar foto
          </Button>
        </Box>

        
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Nombre"
              fullWidth
              disabled
              defaultValue="Ashely Bayona"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: "none", height: "56px" }}
            >
              Editar
            </Button>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="DNI"
              fullWidth
              disabled
              defaultValue="73065779"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: "none", height: "56px" }}
            >
              Editar
            </Button>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Correo electrónico"
              fullWidth
              disabled
              defaultValue="ashley.bayonav@gmail.com"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: "none", height: "56px" }}
            >
              Editar
            </Button>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Teléfono"
              fullWidth
              disabled
              defaultValue="981258941"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: "none", height: "56px" }}
            >
              Editar
            </Button>
          </Grid>

          <Grid item xs={8}>
            <TextField
              label="Dirección"
              fullWidth
              disabled
              defaultValue="Av. Oscar R. Benavides 5737"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: "none", height: "56px" }}
            >
              Editar
            </Button>
          </Grid>
        </Grid>

       
        <Box sx={{ textAlign: "center", marginTop: "16px" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MiCuenta;


/*const MiCuenta = () => {
    return <h2>MiCuenta</h2>;
  };
  
  export default MiCuenta;*/