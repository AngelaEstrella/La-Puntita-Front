import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ModificarCarta = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Mostrar 8 productos por página
  const [formData, setFormData] = useState({
    nombreProducto: "",
    descripcion: "",
    precioUnitario: "",
    imagen: "",
    idTipoProducto: "",
  });
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Filtro de categoría

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        "https://proyecto-pds-24-ii-production.up.railway.app/productos"
      );
      const data = await response.json();
      setProductos(data || []);
      setFilteredProductos(data || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = productos.filter((producto) => {
        if (selectedCategory === "alimento" && producto.idTipoProducto === 1) {
          return true;
        }
        if (selectedCategory === "bebida" && producto.idTipoProducto === 2) {
          return true;
        }
        if (selectedCategory === "topping" && producto.idTipoProducto === 3) {
          return true;
        }
        return false;
      });
      setFilteredProductos(filtered);
    } else {
      setFilteredProductos(productos);
    }
  }, [selectedCategory, productos]);

  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Si el texto es null o undefined, retorna un string vacío
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const categoriaTexto = (idTipoProducto) => {
    if (idTipoProducto === 1) return "Alimento";
    if (idTipoProducto === 2) return "Bebida";
    if (idTipoProducto === 3) return "Topping";
    return "Desconocido";
  };

  const handleOpenAgregar = () => {
    setFormData({
      nombreProducto: "",
      descripcion: "",
      precioUnitario: "",
      imagen: "",
      idTipoProducto: "",
    });
    setOpenAgregar(true);
  };

  const handleOpenEditar = (producto) => {
    setFormData(producto);
    setOpenEditar(true);
  };

  const handleCloseModal = () => {
    setOpenAgregar(false);
    setOpenEditar(false);
  };

  const handleSave = async () => {
    if (!formData.nombreProducto || !formData.precioUnitario || !formData.idTipoProducto) {
      alert("Por favor complete los campos obligatorios: Nombre, Precio y Categoría.");
      return;
    }

    try {
      const payload = {
        nombreProducto: formData.nombreProducto,
        descripcion: formData.descripcion?.trim() === "" ? null : formData.descripcion,
        precioUnitario: parseFloat(formData.precioUnitario),
        imagen: formData.imagen?.trim() === "" ? null : formData.imagen,
        tipoProducto:
          formData.idTipoProducto === 1
            ? "alimento"
            : formData.idTipoProducto === 2
            ? "bebida"
            : formData.idTipoProducto === 3
            ? "topping"
            : null,
      };

      const response = await fetch(
        "https://proyecto-pds-24-ii-production.up.railway.app/producto",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Producto agregado exitosamente");
        fetchProductos(); // Actualizar lista de productos
      } else {
        alert("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    } finally {
      setOpenAgregar(false); // Cerrar el modal
    }
  };

  const handleUpdate = async () => {
    if (!formData.nombreProducto || !formData.precioUnitario || !formData.idTipoProducto) {
      alert("Por favor complete los campos obligatorios: Nombre, Precio y Categoría.");
      return;
    }

    try {
      const payload = {
        nombreProducto: formData.nombreProducto,
        descripcion: formData.descripcion?.trim() === "" ? null : formData.descripcion,
        precioUnitario: parseFloat(formData.precioUnitario),
        imagen: formData.imagen?.trim() === "" ? null : formData.imagen,
        tipoProducto:
          formData.idTipoProducto === 1
            ? "alimento"
            : formData.idTipoProducto === 2
            ? "bebida"
            : formData.idTipoProducto === 3
            ? "topping"
            : null,
      };

      const response = await fetch(
        `https://proyecto-pds-24-ii-production.up.railway.app/update-product/${formData.idProducto}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Producto actualizado exitosamente");
        fetchProductos(); // Actualizar lista de productos
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    } finally {
      setOpenEditar(false); // Cerrar el modal
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://proyecto-pds-24-ii-production.up.railway.app/delete-product/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Producto eliminado exitosamente");
        fetchProductos(); // Actualizar lista de productos
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredProductos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: "24px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#f58ab8", fontWeight: "bold" }}>
          Modificar Carta
        </Typography>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ width: "200px" }}
        >
          <MenuItem value="">Todas las Categorías</MenuItem>
          <MenuItem value="alimento">Alimento</MenuItem>
          <MenuItem value="bebida">Bebida</MenuItem>
          <MenuItem value="topping">Topping</MenuItem>
        </Select>
      </Box>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#f58ab8",
          "&:hover": { backgroundColor: "#f78bb9" },
          marginBottom: "16px",
        }}
        onClick={handleOpenAgregar}
      >
        + Agregar
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Precio U.</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((producto) => (
            <TableRow key={producto.idProducto}>
              <TableCell align="center">{producto.idProducto}</TableCell>
              <TableCell align="center">
                <img
                  src={producto.imagen || "default-image.jpg"}
                  alt="Producto"
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
              <TableCell align="center">{categoriaTexto(producto.idTipoProducto)}</TableCell>
              <TableCell align="center">{producto.nombreProducto || "Sin Nombre"}</TableCell>
              <TableCell align="center">{truncateText(producto.descripcion, 30)}</TableCell>
              <TableCell align="center">{`S/. ${producto.precioUnitario}`}</TableCell>
              <TableCell align="center">
                <EditIcon
                  sx={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                  onClick={() => handleOpenEditar(producto)}
                />
                <DeleteIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(producto.idProducto)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          sx={{ color: "#f58ab8", textTransform: "none" }}
        >
          ANTERIOR
        </Button>
        <Typography sx={{ color: "#f58ab8" }}>
          Página {currentPage} de {Math.ceil(filteredProductos.length / itemsPerPage)}
        </Typography>
        <Button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === Math.ceil(filteredProductos.length / itemsPerPage)}
          sx={{ color: "#f58ab8", textTransform: "none" }}
        >
          SIGUIENTE
        </Button>
      </Box>

      <Dialog open={openAgregar || openEditar} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#f58ab8",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {openAgregar ? "Agregar Producto" : "Editar Producto"}
          <Button onClick={handleCloseModal} sx={{ color: "#fff", fontWeight: "bold" }}>
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={formData.nombreProducto}
            onChange={(e) => setFormData({ ...formData, nombreProducto: e.target.value })}
          />
          <Select
            fullWidth
            value={formData.idTipoProducto}
            onChange={(e) => setFormData({ ...formData, idTipoProducto: e.target.value })}
            displayEmpty
          >
            <MenuItem value="">Categoría</MenuItem>
            <MenuItem value={1}>Alimento</MenuItem>
            <MenuItem value={2}>Bebida</MenuItem>
            <MenuItem value={3}>Topping</MenuItem>
          </Select>
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
          <TextField
            label="Precio Unitario"
            fullWidth
            margin="normal"
            value={formData.precioUnitario}
            onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
          />
          <TextField
            label="Url de la imagen"
            fullWidth
            margin="normal"
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f58ab8", "&:hover": { backgroundColor: "#f78bb9" } }}
            onClick={openAgregar ? handleSave : handleUpdate}
          >
            {openAgregar ? "Guardar Producto" : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModificarCarta;


/*const ModificarCarta = () => {
    return <h2>ModificarCartaa</h2>;
  };
  
  export default ModificarCarta;*/