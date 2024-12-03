import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const urlFetch = "https://proyecto-pds-24-ii-production.up.railway.app/profile";
const urlUpdate = "https://proyecto-pds-24-ii-production.up.railway.app/mi-cuenta";

const MiCuenta = () => {
  const { userId: contextUserId } = useContext(AuthContext); // Obtén el ID del usuario logueado
  const userId = contextUserId || localStorage.getItem("userId");
  const [userData, setUserData] = useState({}); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    if (!userId) {
      console.warn("No hay un userId definido");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${urlFetch}?id_user=${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Manejar cambios en los campos editables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Guardar los datos actualizados
  const handleSave = async () => {
    try {
      const response = await fetch(`${urlUpdate}?id_user=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telefono: userData.telefono,
          email: userData.email,
          direccion: userData.direccion,
          referencia: userData.referencia,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      const result = await response.json();
      alert(result.message || "Cambios guardados exitosamente");
    } catch (err) {
      alert("Hubo un problema al guardar los cambios: " + err.message);
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
          <Typography variant="h5">Mi Cuenta</Typography>
        </Box>

        <Grid container spacing={2}>
          {/* DNI */}
          <Grid item xs={12}>
            <TextField
              label="DNI"
              fullWidth
              disabled
              value={userData.dni || ""}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Nombre */}
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              fullWidth
              disabled
              value={userData.nombre || ""}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Apellido */}
          <Grid item xs={12}>
            <TextField
              label="Apellido"
              fullWidth
              disabled
              value={userData.apellido || ""}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Teléfono */}
          <Grid item xs={12}>
            <TextField
              label="Teléfono"
              name="telefono"
              fullWidth
              value={userData.telefono || ""}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Correo Electrónico */}
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              name="email"
              fullWidth
              value={userData.email || ""}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Dirección */}
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              name="direccion"
              fullWidth
              value={userData.direccion || ""}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Referencia */}
          <Grid item xs={12}>
            <TextField
              label="Referencia"
              name="referencia"
              fullWidth
              value={userData.referencia || ""}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Botón Guardar */}
        <Box sx={{ textAlign: "center", marginTop: "16px" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MiCuenta;
