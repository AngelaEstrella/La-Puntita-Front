import React from "react";
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HistorialCompras = () => {
  // Datos simulados para la tabla
  const data = [
    /*{ id: 1, nombre: "Producto 1", fecha: "2024-11-01" },
    { id: 2, nombre: "Producto 2", fecha: "2024-11-05" },
    { id: 3, nombre: "Producto 3", fecha: "2024-11-10" },
    { id: 4, nombre: "Producto 4", fecha: "2024-11-15" },*/
  ];

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
          width: "600px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        {/* Barra de búsqueda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            backgroundColor: "#f4f4f4",
            borderRadius: "20px",
            padding: "4px 16px",
            border: "1px solid #ddd",
          }}
        >
          <SearchIcon sx={{ marginRight: "8px", color: "#999" }} />
          <TextField
            placeholder="Nombre o código"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
          />
        </Box>

        {/* Tabla */}
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                </TableRow>
              ))}

              {/* Filas vacías para completar el diseño */}
              {[...Array(5)].map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell colSpan={3}>&nbsp;</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HistorialCompras;


/*const HistorialCompras = () => {
    return <h2>Historial de Compras</h2>;
  };
  
  export default HistorialCompras;*/