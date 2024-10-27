import Typography from '@mui/material/Typography'
import "./BestSeler.css"
const pikachu = "https://static.vecteezy.com/system/resources/previews/024/804/557/non_2x/pikachu-art-or-illustration-on-pickachu-free-vector.jpg"
const Africano = '../assets/Africano.png'
let array = [pikachu,pikachu,pikachu,pikachu,Africano]
export default function BestSeler(){
    return(
        <>
        <Typography
                variant="h4"
            >
                Mas Vendidos
            </Typography>
        <div className="container">
            {array.map(image =>{
                return(
                    <img className="best-images" src = {pikachu}/>
                )
            } )}
        </div>
        </>
    )
}