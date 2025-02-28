import CopyRight from './copyright';
import './footer.css';

function Footer() {
    return (
        <>
            <footer>
                <div>
                    <h1>Boletín de noticias</h1>
                    <p>¡Mantente al día con nosotros!</p>
                    <input type='text' placeholder='Ingresa tu correo electrónico'/>
                    <button>Enviar</button>
                </div>

                <div>
                    <h1>Tu Camino Hacia el Bienestar</h1>
                    <p>Nuestro objetivo es acompañar a nuestros clientes en sus viajes únicos hacia el bienestar, por lo que el equipo de Wellness Warehouse trabaja incansablemente para ayudarte a vivir bien.</p>
                    <button>Aprende más</button>
                </div>

                <div>
                    <h1>Contáctanos</h1>
                    <div>
                        <p><span><i className="fa fa-map-marker"></i></span>Espe,Sangolqui</p>
                        <p><span><i className="fa fa-phone"></i></span>+593 0999999999, 99999999</p>
                        <p><span><i className="fa fa-envelope"></i></span>bitebliss@abc.com</p>
                    </div>
                    <p>
                        <span><i className="fa fa-facebook"></i></span>
                        <span><i className="fa fa-twitter"></i></span>
                        <span><i className="fa fa-instagram"></i></span>
                        <span><i className="fa fa-youtube"></i></span>
                    </p>
                </div>
            </footer>
            <CopyRight />
        </>
    );
}

export default Footer;
