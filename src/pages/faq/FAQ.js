import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./FAQ.css";

const FAQ = () => {
  return (
    <Container>
      <section id="faq">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Container>
              <Row>
                <Col lg={9} className="mx-auto">
                  <div className="section-title text-left mt-4 mb-1">
                    <h3 style={{ padding: 0 }}>Preguntas Frecuentes</h3>
                  </div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        ¿Memo es útil si estoy en los primeros años de medicina?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Claro que sí, tenemos mazos de básicas (fisiología,
                          anatomía, fisiopatología) y aún mejor porque irás
                          fijando los conceptos claves que te vendrán en los
                          exámenes nacionales más adelante.
                        </p>
                        <p>
                          De igual manera, tenemos en nuestros mazos de
                          clínicas, tarjetas comentadas con fundamentos de
                          básicas. Por lo que estarás en constante repaso con
                          Memo.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        ¿Cómo se compara Memo con Anki u otro mazo de
                        flashcards?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Memo fue diseñado para que su uso sea sencillo e
                          intuitivo. Existe una buena cantidad de estudiantes
                          que se frustra con la complejidad de Anki, inclusive
                          con los mazos prehechos de mala calidad, los cuales
                          pueden contener errores o preguntas que no se
                          entiendan.
                        </p>
                        <p>
                          Memo resuelve estos problemas con una plataforma que
                          ofrece una interfaz fácil de usar, tarjetas creadas a
                          partir de los materiales más rentables para los
                          estudiantes de medicina, además de estar en constante
                          actualización y contenido contextual adicional por
                          cada flashcard.
                        </p>
                        <p>
                          La mayoría de nuestros usuarios han probado Anki
                          anteriormente, pero encontraron en Memo una forma más
                          sencilla de usar la repetición espaciada, sin perderse
                          con tantas funciones.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        ¿Cómo funciona Memo con mi academia de preparación para
                        el ENAM/ESSALUD/RM?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Memo complementa casi cualquier otro recurso para los
                          exámenes nacionales. Todas las preguntas que hayan
                          venido en los últimos 10 años se encuentran en formato
                          flashcard, con su explicación respectiva. No
                          recomendamos el uso de otro software de repetición
                          espaciada ya que esto generaría redundancia
                          innecesaria de conceptos. Memo funciona de manera
                          eficaz junto a cualquier videoclase de cualquier
                          vuelta o fase de tu academia o universidad, así como
                          cualquier material de banqueo.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        ¿Cada cuanto tiempo debería estudiar en la aplicación?
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          Memo está diseñado para que puedas estudiar a tu
                          ritmo, dependiendo de los mazos que quieras ir
                          desbloqueando, se irán programando según el algoritmo
                          de la repetición espaciada. Recomendamos que el uso de
                          Memo sea como un hábito (30 minutos al día, antes de
                          irse a dormir, luego de una rotación hospitalaria,
                          etc). Estar en continuo aprendizaje y repaso, hará que
                          le saques el máximo provecho a Memo.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default FAQ;
