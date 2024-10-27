import Typography from '@mui/material/Typography'
import "./Layout.css"
export default function Layout(){
    return(
        <div>
            <Typography
                variant="h1"
                style={{
                    fontSize: '5rem', // Adjust font size to make it prominent
                    fontWeight: 'bold',
                    color: '#fd547d', // Use a bold red or similar eye-catching color
                    textAlign: 'left',
                    marginBottom: '20px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Nosotros
            </Typography>
            <div className="image-container">
                <img className="wasa" src="https://images-ext-1.discordapp.net/external/gKxXlGXKhcmkfOfE8Me23NX1PuPIa-Z9Cr69U6tQRo8/https/sitioshoy.com.ar/wp-content/uploads/2022/06/La-Puntita-la-casa-de-waffles-en-Palermo-que-es-furor-hacen-filas-de-dos-cuadras-para-comerlos-716x437.jpg?format=webp&width=662&height=404" />
                <Typography
                variant="p"
                style={{
                    fontSize: '24px',
                    textAlign: 'center',
                    //fontFamily: 'Courier New, Courier, monospace'(No me gusta el tipo de letra)
                }}
                >
                    Hola mundo cruel, este es un mensaje para toda mi gente latino. Este proyecto no nos vencerá, arriba mi gente latino.
                    <br />
                    Los Waffles más Hot 🥵 La Puntita no se lame, se Muerde 🍌
                </Typography>
                </div>
        </div>
    )
}