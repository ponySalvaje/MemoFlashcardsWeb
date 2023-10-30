import { Container, Row, Col } from "react-bootstrap";
import "./HowItWorks.css";
import BenefitsSection from "../../sections/benefits/BenefitsSection";

const HowItWorks = () => {
  return (
    <>
      <Container>
        <section id="how-it-works">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Container>
                <Row>
                  <Col lg={9} className="mx-auto">
                    <div className="section-title text-left mt-4 mb-1">
                      <h3 style={{ padding: 0 }}>¿Cómo funciona?</h3>
                    </div>
                    <article align="justify">
                      <ol>
                        <li>
                          <p>Elige el tema que quieres estudiar.</p>
                        </li>
                        <li>
                          <p>
                            Usa el buscador para desbloquear el tema que desees
                            estudiar (insertar imagen del buscador).
                          </p>
                        </li>
                        <li>
                          <p>
                            Los temas desbloqueados irán a tu pantalla
                            principal, donde podrás darles estudiar (imagen del
                            dashboard principal con temas nuevos).
                          </p>
                        </li>
                        <li>
                          <p>
                            Una vez que decidas estudiar un tema, podrás
                            calificar las flashcards según te haya parecido
                            “difícil”, “normal” o “fácil” de recordar. En base a
                            esto, el algoritmo de Memo te las volverá a
                            preguntar más adelante (Imagen de la sesión de
                            estudio con flashcards).
                          </p>
                        </li>
                        <li>
                          <p>
                            El día que te toque volver a estudiar tus
                            flashcards, Memo te los mostrará en tu pantalla
                            principal. Tu misión debe ser limpiar tu pantalla
                            principal (Insertar imagen del dashboard principal
                            con algunos temas pendientes).
                          </p>
                        </li>
                      </ol>
                    </article>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </section>
      </Container>
      <BenefitsSection />
    </>
  );
};

export default HowItWorks;
