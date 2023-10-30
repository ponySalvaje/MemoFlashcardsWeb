import "./Footer.css";
import { Row, Col } from "react-bootstrap";
import blackLogo from "../../assets/logo/logo_black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="text-center footer-container">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <img alt="Memo Logo" src={blackLogo} width={70} height={70} />
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>
            <ul>
              <li>
                <a href="/home">Inicio</a>
              </li>
              <li>
                <a href="/how-it-works">¿Cómo funciona?</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>
            <ul>
              <li>
                <a href="/FAQ">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="/terms-and-conditions">Términos y condiciones</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>
            <div id="social-media">
              <a
                href="https://www.facebook.com/Memo-108520844902391"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon size="lg" icon={faFacebookSquare} />
              </a>
              <a
                href="https://www.instagram.com/memo_flashcards/"
                target="_blank"
                rel="noreferrer"
                className="instagram"
              >
                <FontAwesomeIcon size="lg" icon={faInstagram} />
              </a>
            </div>
            <ul>
              <li>
                <a
                  href="mailto:memoflashcard.correo@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon size="lg" icon={faEnvelope} />
                  <span> memoflashcard.correo@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=51936280102"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon size="lg" icon={faMobileAlt} />
                  <span> +51 936 280 102</span>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="bottom-footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>Memo</span>
          </strong>
          . Todos los derechos reservados
        </div>
        <div className="credits">
          Desarrollado con ♡ por{" "}
          <a
            href="https://www.linkedin.com/in/marcelo-fernando-r%C3%ADos-berr%C3%BA-519122150/"
            target="_blank"
            rel="noreferrer"
          >
            MTech Solutions
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
