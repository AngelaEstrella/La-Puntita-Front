import { useEffect, useState } from "react";
import "./Carta.css";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/productos";

// Definir las categorías
const puntitas = ["Latino", "Suggar daddy", "Europeo", "Africano", "Dinamita"];
const cuquitas = ["Cocolover", "Europea", "Pichanguera", "Power", "Malcriada"];
const maxipizzas = ["Moreno", "Gringo", "Vergano", "Juguetón", "Carnoso"];

export default function Carta() {
    const [productos, setProductos] = useState([]);
    const [waffles, setWaffles] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [selectedWaffle, setSelectedWaffle] = useState(null);
    const [selectedMaxipizza, setSelectedMaxipizza] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedBebida, setSelectedBebida] = useState(null);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setWaffles(data.filter((item) => puntitas.includes(item.nombreProducto) || cuquitas.includes(item.nombreProducto)));
                setToppings(data.filter((item) => item.idTipoProducto === 3));
                setBebidas(data.filter((item) => item.idTipoProducto === 2));
                setProductos(data);
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    const handleSelectWaffle = (waffle) => {
        setSelectedWaffle(waffle);
        setSelectedMaxipizza(null); // Desactivar maxipizza
        setSelectedToppings([]);
        setSelectedBebida(null);
    };

    const handleSelectMaxipizza = (maxipizza) => {
        setSelectedMaxipizza(maxipizza);
        setSelectedWaffle(null); // Desactivar waffle
        setSelectedToppings([]); // Sin toppings para maxipizza
        setSelectedBebida(null);
    };

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

    const handleSelectBebida = (bebida) => {
        setSelectedBebida(bebida);
    };

    const handleAddToCart = () => {
        if (selectedWaffle || selectedMaxipizza) {
            const item = {
                id: Date.now(),
                producto: selectedWaffle || selectedMaxipizza,
                toppings: selectedWaffle ? selectedToppings : [], // Solo permite toppings para waffles
                bebida: selectedBebida,
                cantidad: 1,
            };
            setCarrito((prev) => [...prev, item]);
            setSelectedWaffle(null);
            setSelectedMaxipizza(null);
            setSelectedToppings([]);
            setSelectedBebida(null);
        } else {
            alert("Por favor, selecciona un waffle o una maxipizza antes de añadir al carrito.");
        }
    };

    return (
        <div className="carta-container">
            <h1>Carta</h1>
            
            <div className="productos-lista">
                {/* NUESTRAS PUNTITAS */}
                <h2>NUESTRAS PUNTITAS</h2>
                <div className="waffles-lista">
                    {waffles.filter((waffle) => puntitas.includes(waffle.nombreProducto)).map((waffle) => (
                        <div key={waffle.idProducto} className={`producto-tarjeta ${selectedWaffle === waffle ? "selected" : ""}`} onClick={() => handleSelectWaffle(waffle)}>
                            <h2 className="producto-nombre">{waffle.nombreProducto}</h2>
                            <p className="producto-precio">Precio: S/{waffle.precioUnitario}</p>
                        </div>
                    ))}
                </div>

                {/* NUESTRAS CUQUITAS */}
                <h2>NUESTRAS CUQUITAS</h2>
                <div className="waffles-lista">
                    {waffles.filter((waffle) => cuquitas.includes(waffle.nombreProducto)).map((waffle) => (
                        <div key={waffle.idProducto} className={`producto-tarjeta ${selectedWaffle === waffle ? "selected" : ""}`} onClick={() => handleSelectWaffle(waffle)}>
                            <h2 className="producto-nombre">{waffle.nombreProducto}</h2>
                            <p className="producto-precio">Precio: S/{waffle.precioUnitario}</p>
                        </div>
                    ))}
                </div>

                {/* NUESTRAS MAXIPIZZAS */}
                <h2>NUESTRAS MAXIPIZZAS</h2>
                <div className="waffles-lista">
                    {productos.filter((product) => maxipizzas.includes(product.nombreProducto)).map((product) => (
                        <div key={product.idProducto} className={`producto-tarjeta ${selectedMaxipizza === product ? "selected" : ""}`} onClick={() => handleSelectMaxipizza(product)}>
                            <h2 className="producto-nombre">{product.nombreProducto}</h2>
                            <p className="producto-precio">Precio: S/{product.precioUnitario}</p>
                        </div>
                    ))}
                </div>

                {/* NUESTRAS BEBIDAS */}
                <h2>NUESTRAS BEBIDAS</h2>
                <div className="bebidas-lista">
                    {bebidas.map((bebida) => (
                        <div key={bebida.idProducto} className={`producto-tarjeta ${selectedBebida === bebida ? "selected" : ""}`} onClick={() => handleSelectBebida(bebida)}>
                            <h2 className="producto-nombre">{bebida.nombreProducto}</h2>
                            <p className="producto-precio">Precio: S/{bebida.precioUnitario}</p>
                        </div>
                    ))}
                </div>

                {/* Toppings y Bebidas - Solo mostrar para waffles */}
                {selectedWaffle && (
                    <div className="extras-container">
                        <h2>Selecciona tus extras</h2>

                        {/* Toppings Section */}
                        <h3>Toppings (Máximo 3)</h3>
                        <div className="extras-options">
                            {toppings.map((topping) => (
                                <label key={topping.idProducto} className="extra-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedToppings.includes(topping)}
                                        onChange={() => handleToggleTopping(topping)}
                                    />
                                    <span>{topping.nombreProducto}</span> - S/{topping.precioUnitario}
                                </label>
                            ))}
                        </div>

                        {/* Bebida Section */}
                        <h3>Bebida (Seleccione 1)</h3>
                        <div className="extras-options">
                            {bebidas.map((bebida) => (
                                <label key={bebida.idProducto} className="extra-option">
                                    <input
                                        type="radio"
                                        name="bebida"
                                        checked={selectedBebida === bebida}
                                        onChange={() => handleSelectBebida(bebida)}
                                    />
                                    <span>{bebida.nombreProducto}</span> - S/{bebida.precioUnitario}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bebidas - Solo para maxipizzas */}
                {selectedMaxipizza && (
                    <div className="extras-container">
                        <h2>Selecciona tu bebida</h2>
                        <div className="extras-options">
                            {bebidas.map((bebida) => (
                                <label key={bebida.idProducto} className="extra-option">
                                    <input
                                        type="radio"
                                        name="bebida"
                                        checked={selectedBebida === bebida}
                                        onChange={() => handleSelectBebida(bebida)}
                                    />
                                    <span>{bebida.nombreProducto}</span> - S/{bebida.precioUnitario}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <button className="add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button>
            </div>
        </div>
    );
}
