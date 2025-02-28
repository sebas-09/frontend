import "./about.css";

function About() {
  return (
    <section className="about">
      <div className="about-image">
        <h3>¿Estás listo para vivir bien?</h3>
      </div>
      <div className="about-content">
        <h1>¿Quiénes somos?</h1>
        <p>
          Bienvenido a **EcoVida**, tu destino para productos premium de salud y
          bienestar diseñados para nutrir tu cuerpo, mente y alma. En
          **EcoVida**, creemos que el verdadero bienestar es un viaje, y estamos
          aquí para apoyarte en cada paso del camino.
        </p>
        <p>
          Nuestra misión en **EcoVida** es simple: empoderar a las personas para
          que vivan vidas más saludables y felices, proporcionándoles productos
          cuidadosamente seleccionados que priorizan la calidad, la eficacia y
          la sostenibilidad. Creemos en el poder de la naturaleza para sanar y
          nutrir, y nos dedicamos a obtener solo los mejores ingredientes
          naturales y orgánicos para nuestros productos.
        </p>
        <p>
          Desde suplementos nutricionales y equipos de fitness hasta productos
          esenciales para el cuidado de la piel y herramientas de relajación,
          **EcoVida** ofrece una amplia gama de productos para apoyar tu viaje
          de bienestar. Ya sea que busques aumentar tus niveles de energía,
          mejorar tu rutina de ejercicios o simplemente consentirte con
          productos de cuidado personal de lujo, aquí encontrarás todo lo que
          necesitas para prosperar.
        </p>

        <div className="icon-container">
          <div className="icon">
            <i className="fa-solid fa-truck-fast"></i>
            <span>Entrega en toda la isla</span>
          </div>

          <div className="icon">
            <i className="fa-regular fa-credit-card"></i>
            <span>Pagos seguros</span>
          </div>

          <div className="icon">
            <i className="fa-solid fa-hand-holding-dollar"></i>
            <span>Precios accesibles</span>
          </div>

          <div className="icon">
            <i className="fa fa-leaf"></i>
            <span>Nuestro compromiso ecológico</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
