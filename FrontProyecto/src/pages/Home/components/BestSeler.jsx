import Typography from '@mui/material/Typography';
import "./BestSeler.css";
import Dinamita from '../assets/Dinamita.png';
import Africano from '../assets/Africano.png';
import Europeo from '../assets/Europeo.png';

const productosPopulares = [Africano, Dinamita,Europeo];

export default function BestSeler() {
    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '10px' }}>
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
