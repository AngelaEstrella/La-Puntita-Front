import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";

const Seguridad = () => {
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
        <Typography variant="h6" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Cambiar contraseña
        </Typography>

        {/* Nueva contraseña */}
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          Nueva contraseña
        </Typography>
        <TextField
          type="password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        <Divider sx={{ marginBottom: "16px" }} />

        {/* Repetir contraseña */}
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          Repetir contraseña
        </Typography>
        <TextField
          type="password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        <Divider sx={{ marginBottom: "16px" }} />

        {/* Contraseña actual */}
        <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
          Contraseña actual
        </Typography>
        <TextField
          type="password"
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "16px" }}
        />
        <Divider sx={{ marginBottom: "16px" }} />

        {/* Botón de guardar cambios */}
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Seguridad;

/*const Seguridad = () => {
    return <h2>Seguridad</h2>;
  };
  
  export default Seguridad;*/