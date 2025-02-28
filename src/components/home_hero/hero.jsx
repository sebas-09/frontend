import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  const { user, toggleUser } = useContext(AuthContext);

  return (
    <section className="hero-section" id="hero">
      <h1>Bienvenido al principal minorista de salud y bienestar.</h1>

      <h3>
        Creemos en la pureza y la bondad natural, sin complicaciones. Nuestro
        objetivo es acompañarte en tu viaje único hacia el bienestar, respetando
        a las personas y al planeta en todo lo que hacemos.
      </h3>
      <div>
        <Link to="/products/All">
          <button>Comprar ahora</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
