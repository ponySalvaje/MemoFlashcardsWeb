import { Container, Row, Col, Button } from "react-bootstrap";
import { Fade } from "react-reveal";
import "./BenefitsSection.css";

function BenefitsSection() {
  return (
    <section id="benefits">
      <Container>
        <Row>
          <Col lg={6} md={6} className="content-item benefits-col">
            <Fade left>
              <h3 className="benefits-title">
                Todas las preguntas EsSalud/ENAM/RM de los últimos 15 años.
              </h3>
            </Fade>
            <Fade left delay={200}>
              <p>
                Memo incluye en sus mazos un amplio arsenal de conceptos que se
                han repetido en los exámenes nacionales en formato flashcard.
              </p>
            </Fade>
            <Fade left delay={400}>
              <Button
                href="/specialties"
                variant="second"
                className="pull-right"
              >
                Comenzar ahora
              </Button>
            </Fade>
          </Col>
          <Col lg={6} md={6} className="content-item">
            <Fade right>
              <img
                src="https://www.memoflashcards.com/img/img-laptop-corto.png"
                className="img-fluid img-benefits"
                alt=""
              />
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default BenefitsSection;
