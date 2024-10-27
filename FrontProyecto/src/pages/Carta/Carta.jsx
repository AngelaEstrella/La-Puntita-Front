import { useEffect, useState } from "react";
import "./Carta.css";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/productos";

export default function Carta() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="carta-container">
            <h1>Carta</h1>
            <div className="productos-lista">
                {productos.map((producto) => (
                    <div key={producto.idProducto} className="producto-tarjeta">
                        <h2 className="producto-nombre">{producto.nombreProducto}</h2>
                        <p className="producto-descripcion">
                            {producto.descripcion || "Descripción no disponible"}
                        </p>
                        <p className="producto-precio">Precio: S/{producto.precioUnitario}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
