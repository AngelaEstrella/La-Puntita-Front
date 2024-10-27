import Typography from '@mui/material/Typography';
import "./BestSeler.css";

const pikachu = "https://static.vecteezy.com/system/resources/previews/024/804/557/non_2x/pikachu-art-or-illustration-on-pickachu-free-vector.jpg";
const productosPopulares = [pikachu, pikachu, pikachu, pikachu]; // Array de productos populares

export default function BestSeler() {
    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Más Vendidos
            </Typography>
            <div className="container">
                {productosPopulares.map((image, index) => (
                    <img key={index} className="best-images" src={image} alt={`Producto popular ${index + 1}`} />
                ))}
            </div>
        </>
    );
}
