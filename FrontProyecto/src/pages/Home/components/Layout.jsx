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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
                </div>
        </div>
    )
}