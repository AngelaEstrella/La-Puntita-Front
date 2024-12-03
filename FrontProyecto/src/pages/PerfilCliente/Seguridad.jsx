import { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/seguridad";

const Seguridad = () => {
  const [contrasenaAntigua, setContrasenaAntigua] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repContrasena, setRepContrasena] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { userId: contextUserId } = useContext(AuthContext);
  const userId = contextUserId || localStorage.getItem("userId");

  const handleChangeContrasena = async (e) => {
    e.preventDefault();

    if (contrasena !== repContrasena) {
      setMessage("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    try {
      // Datos a enviar al backend
      const bodyData = {
        passw: contrasena,
      };

      console.log("Datos enviados:", bodyData);

      const response = await fetch(`${url}?id_user=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Contraseña actualizada correctamente");
        setError(false);
      } else {
        console.error("Error del servidor:", result);
        setMessage(result.detail || "Error al actualizar la contraseña");
        setError(true);
      }
    } catch (err) {
      console.error("Error en la solicitud:", err.message);
      setMessage("Error en la conexión con el servidor");
      setError(true);
    }
  };

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

        <form onSubmit={handleChangeContrasena}>
          {/* Nueva contraseña */}
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Nueva contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
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
            value={repContrasena}
            onChange={(e) => setRepContrasena(e.target.value)}
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
            value={contrasenaAntigua}
            onChange={(e) => setContrasenaAntigua(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />

          {/* Mensajes de éxito o error */}
          {message && (
            <Typography
              variant="body2"
              color={error ? "error" : "success"}
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {message}
            </Typography>
          )}

          {/* Botón guardar */}
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Seguridad;

/*
import { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/seguridad";

const Seguridad = () => {
  const [contrasenaAntigua, setContrasenaAntigua] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repContrasena, setRepContrasena] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { userId } = useContext(AuthContext);

  const handleChangeContrasena = async (e) => {
    e.preventDefault();

    if (contrasena !== repContrasena) {
      setMessage("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_passw: contrasena,
          id_user: userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Asegúrate de que el mensaje sea una cadena
        setMessage(result.message || "Contraseña actualizada correctamente");
        setError(false);
      } else {
        setMessage(result.detail || "Error al actualizar la contraseña");
        setError(true);
      }
    } catch (err) {
      setMessage("Error en la conexión con el servidor");
      setError(true);
    }
  };

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

        <form onSubmit={handleChangeContrasena}>
        
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Nueva contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Repetir contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={repContrasena}
            onChange={(e) => setRepContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
        
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Contraseña actual
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasenaAntigua}
            onChange={(e) => setContrasenaAntigua(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />

          
          {message && (
            <Typography
              variant="body2"
              color={error ? "error" : "success"}
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {typeof message === "string" ? message : "Ocurrió un error inesperado"}
            </Typography>
          )}

    
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Seguridad; */

/*
import { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/seguridad";

const Seguridad = () => {
  const [contrasenaAntigua, setContrasenaAntigua] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repContrasena, setRepContrasena] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { userId } = useContext(AuthContext);

  const handleChangeContrasena = async (e) => {
    e.preventDefault();

    if (contrasena !== repContrasena) {
      setMessage("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_passw: contrasena, // Asegúrate de enviar el valor correcto
          id_user: userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Contraseña actualizada correctamente");
        setError(false);
      } else {
        setMessage(result.detail || "Error al actualizar la contraseña");
        setError(true);
      }
    } catch (err) {
      setMessage("Error en la conexión con el servidor");
      setError(true);
    }
  };

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

        <form onSubmit={handleChangeContrasena}>
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Nueva contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Repetir contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={repContrasena}
            onChange={(e) => setRepContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Contraseña actual
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasenaAntigua}
            onChange={(e) => setContrasenaAntigua(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />

          
          {message && (
            <Typography
              variant="body2"
              color={error ? "error" : "success"}
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {message}
            </Typography>
          )}

         
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Seguridad; */

/*import { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthContext } from "../../services/AuthContext";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/seguridad";

const Seguridad = () => {
  const [contrasenaAntigua, setContrasenaAntigua] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repContrasena, setRepContrasena] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { userId } = useContext(AuthContext);

  const handleChangeContrasena = async(e) => {
    e.preventDefault();

    if (contrasena !== repContrasena) {
      setMessage("Las contraseñas no coinciden");
      setError(true);
      return;
    }

  try{
    const response = await fetch(url,{
      method : "PUT",
      headers:{
        "Content-Type": "application/json",

      },
      body:JSON.stringify({
        new_passw:{passw: contrasena},
        id_user:userId,
      }),
    });
    const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Contraseña actualizada correctamente");
        setError(false);
      } else {
        setMessage(result.detail || "Error al actualizar la contraseña");
        setError(true);
      }
    } catch (err) {
      setMessage("Error en la conexión con el servidor");
      setError(true);
    }
  };

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

        <form onSubmit={handleChangeContrasena}>
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Nueva contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Repetir contraseña
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={repContrasena}
            onChange={(e) => setRepContrasena(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />
          
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            Contraseña actual
          </Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={contrasenaAntigua}
            onChange={(e) => setContrasenaAntigua(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />
          <Divider sx={{ marginBottom: "16px" }} />

         
          {message && (
            <Typography
              variant="body2"
              color={error ? "error" : "success"}
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {message}
            </Typography>
          )}

          
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Seguridad; */