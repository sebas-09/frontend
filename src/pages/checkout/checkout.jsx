import Logo from "../../components/logo/logo";
import "./checkout.css";
import { useForm } from "react-hook-form";
import CopyRight from "../../components/footer/copyright";
import OrderService from "../../api-service/order.service";
import { useContext, useEffect } from "react";
import CartContext from "../../contexts/cart.contect";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { isLoading, error, placeOrder } = OrderService();
  const { cart, cartError, isProcessingCart, getCartInformation } =
    useContext(CartContext);

  const onSubmit = async (data) => {
    placeOrder(data, cart.cartId);
  };

  return (
    <>
      <header className="app-header">
        <Logo />
      </header>
      <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        <div className="checkout-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <small className="text-danger">{error}</small>}
            <div className="input-box">
              <label htmlFor="fname" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Juan"
                {...register("fname", {
                  required: "¡El nombre es obligatorio!",
                })}
              />
              {formState.errors.fname && (
                <small className="text-danger">
                  {formState.errors.fname.message}
                </small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="lname" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Pérez"
                {...register("lname", {
                  required: "¡El apellido es obligatorio!",
                })}
              />
              {formState.errors.lname && (
                <small className="text-danger">
                  {formState.errors.lname.message}
                </small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="address1" className="form-label">
                Dirección Línea 1
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Calle No, Zona"
                {...register("address1", {
                  required: "¡La dirección es obligatoria!",
                })}
              />
              {formState.errors.address1 && (
                <small className="text-danger">
                  {formState.errors.address1.message}
                </small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="address2" className="form-label">
                Dirección Línea 2
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Piso o número de departamento"
                {...register("address2")}
              />
            </div>
            <div className="input-box">
              <label htmlFor="city" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Buenos Aires"
                {...register("city", {
                  required: "¡La ciudad es obligatoria!",
                })}
              />
              {formState.errors.city && (
                <small className="text-danger">
                  {formState.errors.city.message}
                </small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. 07xxxxxxxx"
                {...register("phone", {
                  required: "¡El teléfono es obligatorio!",
                })}
              />
              {formState.errors.phone && (
                <small className="text-danger">
                  {formState.errors.phone.message}
                </small>
              )}
            </div>
            <button
              type="submit"
              className={isLoading ? "loading" : ""}
              name="proceed"
            >
              {isLoading ? "Procesando..." : "Realizar Pedido"}
            </button>
          </form>
          <summary>
            <h2>Resumen del pedido</h2>
            <hr />
            {cart?.cartItems.map((cartItem) => (
              <div className="product" key={cartItem.productId}>
                <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
                <div className="product-info">
                  <h4>{cartItem.productName}</h4>
                  <span className="product-price">
                    {cartItem.price} x {cartItem.quantity} = $.{" "}
                    {parseFloat(cartItem.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <hr />
            <h3>
              <span>Subtotal</span>
              <span>$. {parseFloat(cart?.subtotal).toFixed(2)}</span>
            </h3>
            <br />
            <small>
              Los gastos de envío se agregarán al total final y serán cobrados
              en la entrega por nuestro personal.
            </small>
            <br />
            <Link to="/">
              <button>Editar carrito</button>
            </Link>
          </summary>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default CheckoutForm;
