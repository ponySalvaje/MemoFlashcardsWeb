import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./FindCards.css";
import { useState } from "react";

function FindCards() {
  const [filter, setFilter] = useState("");
  return (
    <section id="find-cards">
      <Container>
        <Row>
          <Col>
            <Form className="search-topic">
              <Form.Group controlId="formSearchTopic">
                <Form.Label>
                  <h3>
                    Buscar flashcards {filter === "" ? "" : `sobre "${filter}"`}
                  </h3>
                </Form.Label>
                <div className="search-bar-group input-group mb-3 align-items-center">
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Escribe el tema que desees buscar aquí"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FindCards;
