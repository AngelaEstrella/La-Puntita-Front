const url= "https://proyecto-pds-24-ii-production.up.railway.app/productos"
//const url= "https://pokeapi.co/api/v2/pokemon/ditto"
import { useEffect, useState } from "react"


export default function Carta(){
        const [productos, setProductos] = useState([]) 
        useEffect(()=>{
                fetch(url).then(res => res.json()).then(data => {
                        console.log(data)
                        setProductos(data)
                        console.log(productos)
                })
        }, [])


        console.log(productos)
        return (
                <>
                <h1>Carta</h1>
                {productos.map((producto, index) => (
                        <>
          <p key={index}>{producto.nombreProducto}</p>
          <p key={index}>{producto.precioUnitario}</p>
          </> // Cambia "nombre" según la estructura de tus datos
        ))}
              
                </>
        )
}