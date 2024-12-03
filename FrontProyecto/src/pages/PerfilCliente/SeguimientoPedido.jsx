
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/mi-cuenta/seguimiento-pedidos";

const SeguimientoPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext); // Tomar userId desde AuthContext

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!userId) {
        console.error("Usuario no autenticado");
        return;
      }
      try {
        const response = await fetch(`${url}?id=${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [userId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: "16px", textAlign: "center", color: "#f58ab8", fontWeight: "bold" }}
      >
        Seguimiento de Pedido
      </Typography>

      <Table
        sx={{
          minWidth: 650,
          "& th, & td": {
            textAlign: "center",
          },
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f58ab8", color: "#fff" }}>
            <TableCell align="center">Id Pedido</TableCell>
            <TableCell align="center">Estado Entrega</TableCell>
            <TableCell align="center">Hora Estimada</TableCell>
            <TableCell align="center">Nombre del Repartidor</TableCell>
            <TableCell align="center">Teléfono del Repartidor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <TableRow key={pedido.idFacturacion}>
                <TableCell align="center">{pedido.idFacturacion}</TableCell>
                <TableCell align="center">{pedido.estadoEntrega}</TableCell>
                <TableCell align="center">{pedido.horaEstimada}</TableCell>
                <TableCell align="center">{pedido.nombreRepartidor}</TableCell>
                <TableCell align="center">{pedido.telefRepartidor}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={5}>
                No hay pedidos en proceso.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SeguimientoPedido;



/*const SeguimientoPedido = () => {
    return <h2>SeguimientoPedido</h2>;
  };
  
  export default SeguimientoPedido;*/