import { useEffect, useState } from "react";
import "./Carta.css";

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
                setProductos(data);
                setWaffles(data.filter((item) => item.idTipoProducto === 1));
                setToppings(data.filter((item) => item.idTipoProducto === 3));
                setBebidas(data.filter((item) => item.idTipoProducto === 2));
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleSelectWaffle = (waffle) => {
        setSelectedWaffle(waffle);
        setSelectedToppings([]); // Clear selected toppings when a new waffle is selected
        setSelectedBebida(null); // Clear selected beverage when a new waffle is selected
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
                waffle: selectedWaffle,
                toppings: selectedToppings,
                bebida: selectedBebida,
            };
            setCarrito((prev) => [...prev, item]);
            // Clear selections
            setSelectedWaffle(null);
            setSelectedToppings([]);
            setSelectedBebida(null);
            alert("Producto añadido al carrito");
        } else {
            alert("Por favor, selecciona un waffle antes de añadir al carrito.");
        }
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
                            <h2 className="producto-nombre">{waffle.nombreProducto}</h2>
                            <p className="producto-descripcion">
                                {waffle.descripcion || "Descripción no disponible"}
                            </p>
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
                                    <h2 className="producto-nombre">{bebida.nombreProducto}</h2>
                                    <p className="producto-precio">Precio: S/{bebida.precioUnitario}</p>
                                </div>
                            ))}
                        </div>

                        <button className="add-to-cart" onClick={handleAddToCart}>
                            Añadir al Carrito
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
