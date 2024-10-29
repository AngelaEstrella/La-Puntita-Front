import { useEffect, useState } from "react";
import "./Carta.css";
import DetallesProducto from "./DetallesProducto";

const url = "https://proyecto-pds-24-ii-production.up.railway.app/productos";

const categorias = {
    Puntitas: ["Latino", "Suggar daddy", "Europeo", "Africano","Dinamita"],
    Cuquitas: ["Cocolover", "Europea", "Pichanguera", "Power", "Malcriada"],
    Maxipizzas: ["Moreno", "Gringo", "Vergano", "Juguetón", "Carnoso"]
};

const urlsImagenes = {
    "Latino": "https://i.ibb.co/DzFDp4L/ElLatino.png",
    "Suggar daddy": "https://i.ibb.co/crWVJCV/Suggar-Daddy.png",
    "Europeo": "https://i.ibb.co/hBfsrL7/El-Europeo.png",
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
};

export default function Carta() {
    const [productos, setProductos] = useState([]);
    const [mainProducts, setMainProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMainProducts(data.filter((item) => item.idTipoProducto === 1));
                setProductos(data);
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        fetchProductos();
    }, []);

    // Filtrar productos según la categoría seleccionada
    const filteredProducts = mainProducts.filter((product) => {
        if (selectedCategory === "Todos") return true;
        return categorias[selectedCategory]?.includes(product.nombreProducto);
    });

    return (
        <div className="carta-container">
            <h1>Carta</h1>

            {/* Barra de categorías */}
            <div className="categoria-barra">
                {["Todos", "Puntitas", "Cuquitas", "Maxipizzas"].map((categoria) => (
                    <button
                        key={categoria}
                        className={`categoria-boton ${selectedCategory === categoria ? "active" : ""}`}
                        onClick={() => setSelectedCategory(categoria)}
                    >
                        {categoria.toUpperCase()}
                    </button>
                ))}
            </div>

            <section className="categoria">
                <div className="producto-lista">
                    {filteredProducts.map((product) => (
                        <div key={product.idProducto} className="producto-tarjeta">
                            <img src={urlsImagenes[product.nombreProducto]} alt={product.nombreProducto} className="producto-imagen" />
                            <div className="producto-info">
                                <h3 className="producto-nombre">{product.nombreProducto}</h3>
                                <p className="producto-descripcion">{product.descripcion}</p>
                                <p className="producto-precio">S/ {product.precioUnitario}</p>
                                <button className="boton-agregar" onClick={() => setSelectedProduct(product)}>Agregar al pedido</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedProduct && (
                <DetallesProducto
                    producto={selectedProduct}
                    productos={productos}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
