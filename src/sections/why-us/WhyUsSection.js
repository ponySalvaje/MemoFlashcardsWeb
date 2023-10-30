import { useState, useEffect } from "react";
import { Row, Col, Container, Carousel } from "react-bootstrap";
import { Fade } from "react-reveal";
import "./WhyUsSection.css";
import CardBenefit from "../../components/card-benefit/CardBenefit";

function WhyUsSection() {
  const cardsData = [
    {
      title: "Aprendizaje dinámico y entretenido",
      text: "Estudia donde, como y cuando quieras desde tu ordenador, tablet o celular, cinco minutos o una hora, en tu casa o saliendo de tu rotación hospitalaria.",
      backgroundColor: "#D8D6FF",
    },
    {
      title: "Cloze 3, imágenes, basado en casos",
      text: "Información extra con evidencias, curiosidades y tips para la práctica médica, flashcards de imágenes (rx, resonancias, biopsias, facies, etc).",
      backgroundColor: "#C4C2FF",
    },
    {
      title: "Intuitivo y de fácil uso desde el primer momento",
      text: "Memo asegura su uso intuitivo y sencillo, para que le saques el mayor provecho desde el primer día de uso de estudio. Una herramienta cómoda de usar.",
      backgroundColor: "#9E9BF2",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="why-us">
      <Container>
        <div className="mt-4 mb-2 text-center section-title">
          <h3 className="mb-3">¿Por qué elegir Memo?</h3>
          <p className="section-description">
            Memo se basa en <b>estrategias de estudio</b> basadas en evidencia,{" "}
            <b>integradas</b> en <b>una experiencia perfecta</b>
          </p>
        </div>
        {isMobile ? (
          <Carousel>
            {cardsData.map((card, index) => (
              <Carousel.Item key={index}>
                <Fade delay={index * 200}>
                  <CardBenefit {...card} />
                </Fade>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Row className="justify-content-center pt-4">
            {cardsData.map((card, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className="no-padding"
              >
                <Fade delay={index * 200}>
                  <CardBenefit {...card} />
                </Fade>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default WhyUsSection;
