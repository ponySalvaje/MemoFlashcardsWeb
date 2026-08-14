import { Alert, Container, Row, Col } from "react-bootstrap";
import "./Topics.css";
import CardTopic from "../../components/card-topic/CardTopic";
import { getTopics } from "../../api/topics.api";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const specialtyName = location.state && location.state.specialtyName;

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoadError(false);
        const topicsData = await getTopics(id);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error loading topics:", error);
        setTopics([]);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, [id]);

  return (
    <section id="topics">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="mt-4 mb-2 text-center section-title">
              <h3 className="mb-3">Temas de estudio para {specialtyName}</h3>
              <p className="section-description">
                {topics.length} temas disponibles.
              </p>
            </div>
            {loadError ? (
              <Alert variant="danger" role="alert">
                No pudimos cargar los temas. Por favor, inténtalo nuevamente.
              </Alert>
            ) : topics.length === 0 ? (
              <p className="text-center">No hay temas disponibles.</p>
            ) : (
              <Row xs={2} sm={2} md={3} lg={4} className="g-4">
                {topics.map((topic) => (
                  <Col key={topic.id}>
                    <CardTopic
                      title={topic.title}
                      freeQuantity={topic.free}
                      premiumQuantity={topic.premium}
                      id={topic.id}
                      relatedTopics={topics.filter(
                        (myTopic) => myTopic.id !== topic.id
                      )}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

export default Topics;
