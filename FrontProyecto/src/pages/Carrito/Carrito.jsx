import React from "react";
import { useCart } from "../../components/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

//AÑADIDOS IMPORT:
import { AuthContext } from "../../services/AuthContext"; // Importar el AuthContext
import { useContext } from "react"; // Hook para usar el contexto

const Carrito = () => {
  const { cartItems, total, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate(); // Para redirigir a la carta
  //AÑADIDOS CONST:
  const { userId, isAuthenticated } = useContext(AuthContext); // Obtener el estado del contexto  

  //AÑADIDOS PARA PAGO:
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para continuar con el pago.");
      navigate("/login"); // Redirigir al login si no está autenticado
      return;
    }

    // Preparar el JSON que se enviará al backend
    const paymentData = {
      userId: userId, // Obtener dinámicamente el userId del contexto
      products: cartItems.map((product) => ({
        productId: product.idProducto,
        quantity: product.quantity,
      })),
      totalAmount: total * 100, // Total en centavos
      delivery: false, // Cambiar si existe opción de delivery
    };

    console.log("Datos enviados al backend:", paymentData);

    try {
      // Llamada al backend para crear el payment intent
      const response = await fetch("http://localhost:3001/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.clientSecret) {
        console.log("ClientSecret recibido:", data.clientSecret);
        navigate("/checkout", { state: { clientSecret: data.clientSecret } });
      } else {
        console.error("Error en el backend:", data.error);
        alert("Error al iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Hubo un problema al procesar el pago. Intenta nuevamente.");
    }
  };

  //RESTO DEL CODIGO SIN CAMBIOS
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
              <div className="subtotal">
                <h2>SubTotal: S/ {total.toFixed(2)}</h2>
              </div>
              <div className="footer-buttons">
                <button className="clear-cart-button" onClick={clearCart}>
                  Vaciar Carrito
                </button>
                <button className="pay-button" navigate="/checkout">
                  Ir a Pagar
                </button>
              </div>
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