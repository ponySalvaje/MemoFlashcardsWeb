import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./QuestionnaireDone.css";
import CardTopic from "../card-topic/CardTopic";

function QuestionnaireDone({
  topicName,
  completedCards,
  suspendedCards,
  relatedTopics,
}) {
  return (
    <Container>
      <Row className="justify-content-center pt-4">
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card className="questionnaire-done-card">
            <div className="mt-4 mb-2 text-center">
              <h3 className="mb-3">¡Finalizaste el grupo de tarjetas!</h3>
              <p className="section-description">Tema: {topicName}</p>
              <p>{completedCards} Tarjetas completadas</p>
              <p>{suspendedCards} Tarjetas suspendidas</p>
              <div className="mt-auto">
                <Button href="/specialties" variant="main" className="btn my-1">
                  Continuar estudiando
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="mt-5 mb-2 text-center">
        <h3 className="mb-3">Temas relacionados</h3>
        <p className="section-description">
          Puedes navegar por los {relatedTopics.length} temas de estudio o usar
          el buscador para encontrar el flashcard que desees.
        </p>
      </div>
      <Row xs={2} sm={2} md={3} lg={4} className="g-4">
        {relatedTopics.map((topic) => (
          <Col key={topic.id} className="h-100">
            <CardTopic
              title={topic.title}
              freeQuantity={topic.free}
              premiumQuantity={topic.premium}
              id={topic.id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default QuestionnaireDone;
