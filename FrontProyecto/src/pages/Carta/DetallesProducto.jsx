import { useState } from "react";
import "./DetallesProducto.css";
import { FaTrash } from "react-icons/fa"; // Importar ícono de basura

const urlsImagenes = {
    productos: {
        "Latino": "https://i.ibb.co/DzFDp4L/ElLatino.png",
        "Suggar daddy": "https://i.ibb.co/crWVJCV/Suggar-Daddy.png",
        "Europeo": "https://i.ibb.co/qNgVkhG/Europeoo.png",
        "Africano": "https://i.ibb.co/6w5LxGb/El-Africano.png",
        "Dinamita": "https://i.ibb.co/02tjjs4/La-Dinamita.png",
        "Cocolover": "https://i.ibb.co/t8BqjTS/Coco-Lover.png",
        "Europea": "https://i.ibb.co/9bdb6yK/Europea.png",
        "Pichanguera": "https://i.ibb.co/0yfZRnZ/Pichangera.png",
        "Power": "https://i.ibb.co/VYYkYvk/Power.png",
        "Malcriada": "https://i.ibb.co/jzDF80x/Malcriada.png",
        "Moreno": "https://i.ibb.co/hY7WDqX/Moreno.png",
        "Gringo": "https://i.ibb.co/19g2pmJ/Gringo.png",
        "Vergano": "https://i.ibb.co/qrqw4rC/Vergano.png",
        "Juguetón": "https://i.ibb.co/kHYSW1B/Jugueton.png",
        "Carnoso": "https://i.ibb.co/wykQF1T/Carnoso.png"
    },
    toppings: {
        "Manjar": "https://i.ibb.co/0Bv0ZR1/ManjarT.png",
        "Leche condensada": "https://i.ibb.co/CvbS58L/Leche-Condensada.png",
        "Fudge": "https://i.ibb.co/4TB5CDQ/Fugde.png",
        "Fresa": "https://i.ibb.co/g7JyN4S/Fresa.png",
        "Maracuyá": "https://i.ibb.co/LxWpPkm/Maracuy.png",
        "Nutella": "https://i.ibb.co/17g2BJ6/NutellaT.png",
        "Mini oreo": "https://i.ibb.co/zs8ShJp/OreoT.png",
        "Lentejitas": "https://i.ibb.co/R0JdShq/Lentejas-T.png",
        "Choco crispi": "https://i.ibb.co/Z1gjcX7/Chococrispi-T.png",
        "Grageas": "https://i.ibb.co/Pr3cZgh/GrajeasT.png",
    },
    bebidas: {
        "Jugo de naranja": "https://i.ibb.co/fMskWHL/Naranja.png",
        "Jugo de papaya": "https://i.ibb.co/fMskWHL/Naranja.png",
        "Jugo de fresa": "https://i.ibb.co/qd15NyL/Jugo-Fresa.png",
        "Jugo de fresa con leche": "https://i.ibb.co/qd15NyL/Jugo-Fresa.png",
        "Milkshake de oreo": "https://i.ibb.co/Y8DC1N9/Milkshake-Oreo.png",
        "Milkshake de strawberry": "https://i.ibb.co/NTFSHqC/Milkshake-Fresa.png",
        "Milkshake de brownie": "https://i.ibb.co/8YkXw57/Milkshake-Choco.png",
        "Milkshake de nutella": "https://i.ibb.co/8YkXw57/Milkshake-Choco.png",
        "Frozen de fresa": "https://i.ibb.co/xgB83Y8/Freson.png",
        "Frozen de piña": "https://i.ibb.co/gjK231T/Maracumango.png",
        "Frozen de maracumango": "https://i.ibb.co/gjK231T/Maracumango.png",
    }
};

export default function DetallesProducto({ producto, productos, onClose }) {
    // Filtrar toppings y bebidas de la base de datos
    const toppings = productos.filter(item => item.idTipoProducto === 3 || item.idTipoProducto === 4);
    const bebidas = productos.filter(item => item.idTipoProducto === 2);

    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedBebida, setSelectedBebida] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    // Manejar selección de toppings
    const handleToggleTopping = (topping) => {
        setSelectedToppings((prev) => {
            if (prev.includes(topping)) {
                return prev.filter((item) => item !== topping);
            } else if (prev.length < 3) {
                return [...prev, topping];
            } else {
                alert("Máximo de 3 toppings permitido.");
                return prev;
            }
        });
    };

    // Manejar selección de bebida
    const handleSelectBebida = (bebida) => {
        setSelectedBebida(bebida);
    };

    // Manejar cambio de cantidad
    const handleIncrement = () => setCantidad(cantidad + 1);
    const handleDecrement = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    // Agregar al carrito
    const handleAddToCart = () => {
        alert(`Producto añadido al carrito con ${cantidad} unidades.`);
        onClose();
    };

    // Renderizar opciones de selección con estilo similar a la imagen proporcionada
    const renderOptions = () => {
        if (["Latino", "Suggar daddy", "Europeo", "Africano", "Dinamita", "Cocolover", "Europea", "Pichanguera", "Power", "Malcriada"].includes(producto.nombreProducto)) {
            // Opciones para Waffles (Puntitas y Cuquitas)
            return (
                <>
                    <div className="opciones-container">
                        <h3>Selecciona tus toppings (Máximo 3)</h3>
                        {toppings.map((topping) => (
                            <div key={topping.idProducto} className="opcion-item">
                                <img src={urlsImagenes.toppings[topping.nombreProducto]} alt={topping.nombreProducto} className="opcion-imagen" />
                                <span className="opcion-nombre">{topping.nombreProducto} - S/ {topping.precioUnitario}</span>
                                <input
                                    type="checkbox"
                                    onChange={() => handleToggleTopping(topping)}
                                    checked={selectedToppings.includes(topping)}
                                    className="opcion-checkbox"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="opciones-container">
                        <h3>Selecciona tu bebida (Opcional)</h3>
                        {bebidas.map((bebida) => (
                            <div key={bebida.idProducto} className="opcion-item">
                                <img src={urlsImagenes.bebidas[bebida.nombreProducto]} alt={bebida.nombreProducto} className="opcion-imagen" />
                                <span className="opcion-nombre">{bebida.nombreProducto} - S/ {bebida.precioUnitario}</span>
                                <input
                                    type="radio"
                                    name="bebida"
                                    onChange={() => handleSelectBebida(bebida)}
                                    checked={selectedBebida === bebida}
                                    className="opcion-radio"
                                />
                            </div>
                        ))}
                    </div>
                </>
            );
        } else if (["Moreno", "Gringo", "Vergano", "Juguetón", "Carnoso"].includes(producto.nombreProducto)) {
            // Opciones para Maxipizzas
            return (
                <div className="opciones-container">
                    <h3>Selecciona tu bebida (Opcional)</h3>
                    {bebidas.map((bebida) => (
                        <div key={bebida.idProducto} className="opcion-item">
                            <img src={urlsImagenes.bebidas[bebida.nombreProducto]} alt={bebida.nombreProducto} className="opcion-imagen" />
                            <span className="opcion-nombre">{bebida.nombreProducto} - S/ {bebida.precioUnitario}</span>
                            <input
                                type="radio"
                                name="bebida"
                                onChange={() => handleSelectBebida(bebida)}
                                checked={selectedBebida === bebida}
                                className="opcion-radio"
                            />
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="detalles-container">
            <button className="close-button" onClick={onClose}>X</button>
            <div className="producto-imagen-container">
                <img src={urlsImagenes.productos[producto.nombreProducto]} alt={producto.nombreProducto} className="producto-imagen" />
            </div>
            <div className="producto-detalles">
                <h2>{producto.nombreProducto}</h2>
                <p>{producto.descripcion}</p>
                <p className="producto-precio">S/ {producto.precioUnitario}</p>
            </div>

            {/* Opciones de selección */}
            {renderOptions()}

            {/* Control de cantidad con ícono de basura */}
            <div className="cantidad-container">
                <button className="cantidad-boton basura" onClick={onClose}>
                    <FaTrash />
                </button>
                <button className="cantidad-boton" onClick={handleDecrement}>-</button>
                <span className="cantidad">{cantidad}</span>
                <button className="cantidad-boton" onClick={handleIncrement}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>Agregar al pedido</button>
        </div>
    );
}
