import { Container, Row, Col } from "react-bootstrap";
import "./Specialties.css";
import CardSpecialty from "../../components/card-specialty/CardSpecialty";
import { useState, useEffect } from "react";
import { getSpecialties } from "../../api/specialties.api";
import Loading from "../../components/loading/Loading";

function Specialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSpecialties = async () => {
    try {
      const specialtiesData = (await getSpecialties()).data.content;
      setSpecialties(specialtiesData);
    } catch (error) {
      console.error("Error loading specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialties();
  }, []);

  return (
    <section id="specialties">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="mt-4 mb-2 text-center section-title">
              <h3 className="mb-3">Añade el tema que desees estudiar</h3>
              <p className="section-description">
                Puedes navegar por las {specialties.length} especialidades o
                usar el buscador para encontrar el tema que deseas.
              </p>
            </div>
            <Row xs={2} sm={2} md={3} lg={4} className="g-4">
              {specialties.map((specialty) => (
                <Col key={specialty.id}>
                  <CardSpecialty
                    imageUrl={specialty.photo}
                    title={specialty.title}
                    freeQuantity={specialty.free}
                    premiumQuantity={specialty.premium}
                    id={specialty.id}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}

export default Specialties;
