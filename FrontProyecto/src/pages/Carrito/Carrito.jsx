import React from "react";
import { useCart } from "../../components/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

const Carrito = () => {
  const { cartItems, total, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate(); // Para redirigir a la carta

  return (
    <div className="carrito-container">
      <div className="carrito-content">
        <h1 className="carrito-title">Tu Carrito</h1>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((product) => (
              <div key={product.idProducto} className="carrito-product-card">
                <div className="product-image-container">
                  <img
                    src={product.imagen}
                    alt={product.nombreProducto}
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h2 className="product-name">{product.nombreProducto}</h2>
                  <p className="product-price">
                    Total: S/{" "}
                    {(
                      product.quantity *
                      (product.precioUnitario +
                        product.toppings.reduce(
                          (sum, topping) => sum + topping.precioUnitario,
                          0
                        ) +
                        (product.bebida ? product.bebida.precioUnitario : 0))
                    ).toFixed(2)}
                  </p>
                  <div className="personalization">
                    <h4>Personalización del Producto:</h4>
                    <p>Precio base: S/ {product.precioUnitario}</p>
                    {product.toppings.map((topping, index) => (
                      <p key={index}>
                        Topping: {topping.nombreProducto} - S/{" "}
                        {topping.precioUnitario}
                      </p>
                    ))}
                    {product.bebida && (
                      <p>
                        Bebida: {product.bebida.nombreProducto} - S/{" "}
                        {product.bebida.precioUnitario}
                      </p>
                    )}
                  </div>
                  <div className="product-actions">
                    <span className="product-quantity">
                      Cantidad: {product.quantity}
                    </span>
                    <button
                      className="remove-product-button"
                      onClick={() => removeFromCart(product.idProducto)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="carrito-total">
              <h2>Total: S/ {total.toFixed(2)}</h2>
              <button className="clear-cart-button" onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h2 className="empty-cart-title">Comienza tu próximo pedido</h2>
            <p className="empty-cart-description">
              Agrega algún alimento favorito y aparecerán aquí. Tendrás la oportunidad de revisar antes de realizar el pago.
            </p>
            <button
              className="empty-cart-button"
              onClick={() => navigate("/carta")}
            >
              Haz tu pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
