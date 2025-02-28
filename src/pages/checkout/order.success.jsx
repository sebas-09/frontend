import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";
import success from "../../assets/images/icons/success.gif";
import "./checkout.css";

function OrderSuccess() {
  const { user, toggleUser } = useContext(AuthContext);

  return (
    <main className="order-success">
      <div className="order-success-box">
        <Logo />
        <img src={success} alt="Pedido exitoso" />
        <h4 style={{ textAlign: "center", color: "green" }}>
          ¡Gracias por tu pedido!
          <br />
          Tu orden ha sido realizada con éxito.
        </h4>
        <h4 style={{ textAlign: "center", color: "green" }}>
          Se ha enviado un correo de confirmación del pedido a {user?.email}.
        </h4>
        <Link to="/">
          <button>Ir a inicio</button>
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;
