import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./FindCards.css";
import { useCallback, useEffect, useState } from "react";
import { searchCards } from "../../api/cards.api";
import Loading from "../../components/loading/Loading";
import filteredCardTypes from "../../common/constants/filteredCardTypes";
import FilteredCardItem from "../../components/filtered-card-item/FilteredCardItem";
import { useNavigate } from "react-router-dom";

function FindCards() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const cardLists = useCallback(async () => {
    try {
      const cardsData = (await searchCards()).data;
      setCards(cardsData);
      console.log("cards: ", cardsData);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (filter.length > 0) {
      setFilteredCards(
        cards.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
      );
    }
    if (filter.length === 0) {
      setFilteredCards([]);
    }
  }, [filter]);

  useEffect(() => {
    cardLists();
  }, [cardLists]);

  const goToTopic = (id, name) => {
    navigate("/topics/" + id, {
      state: { specialtyName: name },
    });
  };

  const goToQuestionnaire = async (id, name) => {
    navigate("/questionnaire/" + id, {
      state: { topicName: name, relatedTopics: [] },
    });
  };

  const filteredCardPressHandler = (cardItem) => {
    switch (cardItem.type) {
      case filteredCardTypes.lesson:
        goToTopic(cardItem.id, cardItem.name);
        break;
      case filteredCardTypes.subject:
        goToQuestionnaire(cardItem.id, cardItem.name);
        break;
      default:
        break;
    }
  };

  return (
    <section id="find-cards">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Row>
              <Col>
                <Form className="search-topic">
                  <Form.Group controlId="formSearchTopic">
                    <Form.Label>
                      <h3>
                        Buscar flashcards{" "}
                        {filter === "" ? "" : `sobre "${filter}"`}
                      </h3>
                    </Form.Label>
                    <div className="search-bar-group input-group mb-3 align-items-center">
                      <FontAwesomeIcon
                        className="search-icon"
                        icon={faSearch}
                      />
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
            <Row>
              <Col>
                {filteredCards.map((cardItem) => (
                  <FilteredCardItem
                    key={cardItem.type + "-" + cardItem.id}
                    item={cardItem}
                    onClick={() => filteredCardPressHandler(cardItem)}
                  />
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}

export default FindCards;
