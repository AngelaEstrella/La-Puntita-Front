import { useEffect, useState } from "react";
import "./Carta.css";
/*
// Importar imágenes de waffles, toppings y bebidas desde ImagenCarta
// Waffles
import Latino from '../ImagenCarta/Latino.png'; // Imagen de waffle "Latino"
import SuggarDaddy from '../ImagenCarta/SuggarDaddy.png'; // Imagen de waffle "Suggar Daddy"
// ... Añadir importaciones para otros waffles

// Toppings
import MiniOreo from '../ImagenCarta/MiniOreo.png'; // Imagen de topping "Mini Oreo"
import Fresa from '../ImagenCarta/Fresa.png'; // Imagen de topping "Fresa"
// ... Añadir importaciones para otros toppings

// Bebidas
import JugoPapaya from '../ImagenCarta/JugoPapaya.png'; // Imagen de bebida "Jugo de Papaya"
import MilkshakeNutella from '../ImagenCarta/MilkshakeNutella.png'; // Imagen de bebida "Milkshake de Nutella"
// ... Añadir importaciones para otras bebidas
*/
const url = "https://proyecto-pds-24-ii-production.up.railway.app/productos";

export default function Carta() {
    const [productos, setProductos] = useState([]);
    const [waffles, setWaffles] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [selectedWaffle, setSelectedWaffle] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedBebida, setSelectedBebida] = useState(null);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                // Asignar imágenes basadas en el nombre del producto
                const productosConImagenes = data.map((producto) => {
                    if (producto.nombreProducto === "Latino") {
                        return { ...producto, imagen: Latino };
                    }
                    if (producto.nombreProducto === "Suggar daddy") {
                        return { ...producto, imagen: SuggarDaddy };
                    }
                    if (producto.nombreProducto === "Mini oreo") {
                        return { ...producto, imagen: MiniOreo };
                    }
                    if (producto.nombreProducto === "Fresa") {
                        return { ...producto, imagen: Fresa };
                    }
                    if (producto.nombreProducto === "Jugo de papaya") {
                        return { ...producto, imagen: JugoPapaya };
                    }
                    if (producto.nombreProducto === "Milkshake de nutella") {
                        return { ...producto, imagen: MilkshakeNutella };
                    }
                    // ... Añadir condiciones para otros productos
                    return producto;
                });

                setProductos(productosConImagenes);
                setWaffles(productosConImagenes.filter((item) => item.idTipoProducto === 1));
                setToppings(productosConImagenes.filter((item) => item.idTipoProducto === 3));
                setBebidas(productosConImagenes.filter((item) => item.idTipoProducto === 2));
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleSelectWaffle = (waffle) => {
        setSelectedWaffle(waffle);
        setSelectedToppings([]);
        setSelectedBebida(null);
    };

    const handleToggleTopping = (topping) => {
        setSelectedToppings((prev) =>
            prev.includes(topping)
                ? prev.filter((item) => item !== topping)
                : [...prev, topping]
        );
    };

    const handleSelectBebida = (bebida) => {
        setSelectedBebida(bebida);
    };

    const handleAddToCart = () => {
        if (selectedWaffle) {
            const item = {
                id: Date.now(),
                waffle: selectedWaffle,
                toppings: selectedToppings,
                bebida: selectedBebida,
                cantidad: 1,
            };
            setCarrito((prev) => [...prev, item]);
            setSelectedWaffle(null);
            setSelectedToppings([]);
            setSelectedBebida(null);
        } else {
            alert("Por favor, selecciona un waffle antes de añadir al carrito.");
        }
    };

    const handleIncrementCantidad = (id) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };

    const handleDecrementCantidad = (id) => {
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        );
    };

    const handleRemoveFromCart = (id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => {
            const toppingTotal = item.toppings.reduce((sum, topping) => sum + topping.precioUnitario, 0);
            const bebidaPrecio = item.bebida ? item.bebida.precioUnitario : 0;
            const subtotal = (item.waffle.precioUnitario + toppingTotal + bebidaPrecio) * item.cantidad;
            return total + subtotal;
        }, 0);
    };

    return (
        <div className="carta-container">
            <h1>Carta</h1>
            <div className="productos-lista">
                <h2>Waffles</h2>
                <div className="waffles-lista">
                    {waffles.map((waffle) => (
                        <div
                            key={waffle.idProducto}
                            className={`producto-tarjeta ${selectedWaffle === waffle ? "selected" : ""}`}
                            onClick={() => handleSelectWaffle(waffle)}
                        >
                            <img src={waffle.imagen} alt={waffle.nombreProducto} className="producto-imagen" />
                            <h2 className="producto-nombre">{waffle.nombreProducto}</h2>
                            <p className="producto-precio">Precio: S/{waffle.precioUnitario}</p>
                        </div>
                    ))}
                </div>

                {selectedWaffle && (
                    <>
                        <h2>Toppings</h2>
                        <div className="toppings-lista">
                            {toppings.map((topping) => (
                                <div
                                    key={topping.idProducto}
                                    className={`producto-tarjeta topping ${selectedToppings.includes(topping) ? "selected" : ""}`}
                                    onClick={() => handleToggleTopping(topping)}
                                >
                                    <img src={topping.imagen} alt={topping.nombreProducto} className="producto-imagen" />
                                    <h2 className="producto-nombre">{topping.nombreProducto}</h2>
                                    <p className="producto-precio">+ S/{topping.precioUnitario}</p>
                                </div>
                            ))}
                        </div>

                        <h2>Bebidas</h2>
                        <div className="bebidas-lista">
                            {bebidas.map((bebida) => (
                                <div
                                    key={bebida.idProducto}
                                    className={`producto-tarjeta bebida ${selectedBebida === bebida ? "selected" : ""}`}
                                    onClick={() => handleSelectBebida(bebida)}
                                >
                                    <img src={bebida.imagen} alt={bebida.nombreProducto} className="producto-imagen" />
                                    <h2 className="producto-nombre">{bebida.nombreProducto}</h2>
                                    <p className="producto-precio">Precio: S/{bebida.precioUnitario}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
