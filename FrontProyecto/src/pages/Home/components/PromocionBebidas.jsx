import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './PromocionBebidas.css'; 

function PromocionBebidas() {
  return (
    <Box className="promocionBebidasContainer">
      {/* Columna de imágenes */}
      <Box className="imagenesBebidas">
        <img src="ruta-de-imagen-bebida-1.jpg" alt="Strawberry Shaken Lemonade" className="imagenBebida" />
        <img src="ruta-de-imagen-bebida-2.jpg" alt="Pink Berries Shaken Lemonade" className="imagenBebida" />
        <img src="ruta-de-imagen-bebida-3.jpg" alt="Frozen Strawberry Lemonade" className="imagenBebida" />
        <img src="ruta-de-imagen-bebida-4.jpg" alt="Dragon Fruit Frozen Lemonade" className="imagenBebida" />
      </Box>

      {/* Columna de texto */}
      <Box className="textoPromocion">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
          Nuevas bebidas con limonada
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: '#555' }}>
          Disfruta tu día de manera diferente con sabores únicos.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#35652E',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '10px 20px',
            marginTop: 3,
            '&:hover': {
              backgroundColor: '#2B4E23',
            },
          }}
        >
          Pídelas aquí
        </Button>
      </Box>
    </Box>
  );
}

export default PromocionBebidas;
