import Typography from '@mui/material/Typography'
import "./Layout.css"
export default function Layout(){
    return(
        <div>
            <Typography
                variant="h1"
            >
                Nosotros
            </Typography>
            <div className="image-container">
                <img className="wasa" src="https://images-ext-1.discordapp.net/external/gKxXlGXKhcmkfOfE8Me23NX1PuPIa-Z9Cr69U6tQRo8/https/sitioshoy.com.ar/wp-content/uploads/2022/06/La-Puntita-la-casa-de-waffles-en-Palermo-que-es-furor-hacen-filas-de-dos-cuadras-para-comerlos-716x437.jpg?format=webp&width=662&height=404" />
                <Typography
                variant="p"
                >
                    Hola mundo cruel, este es un mensaje para toda mi gente latino. Este proyecto no nos vencerá, arriba mi gente latino.
                    <br />
                    Los Waffles más Hot 🥵 La Puntita no se lame, se Muerde 🍌
                </Typography>
                </div>
        </div>
    )
}