import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardQuestionnaire from "../../components/card-questionnaire/CardQuestionnaire";
import "./Questionnaire.css";
import QuestionnaireDetails from "../../components/questionnaire-details/QuestionnaireDetails";
import AdditionalInformation from "../../components/additional-information/AdditionalInformation";
import SuspendCardModal from "../../components/suspend-card-modal/SuspendCardModal";
import QuestionHelpModal from "../../components/question-help-modal/QuestionHelpModal";
import QuestionnaireDone from "../../components/questionnaire-done/QuestionnaireDone";
import { getCards } from "../../api/cards.api";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { getProfileInformation } from "../../api/profile.api";
import UpgradePlan from "../../components/upgrade-plan/UpgradePlan";
import { roles } from "../../common/constants/roles";

function Questionnaire() {
  const [currentCard, setCurrentCard] = useState(0);
  const [suspendCardsCount, setSuspendedCardsCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuspendCardModal, setShowSuspendCardModal] = useState(false);
  const [showQuestionHelpModal, setShowQuestionHelpModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [profileInfo, setProfileInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const topicName = location.state && location.state.topicName;
  const relatedTopics = location.state && location.state.relatedTopics;

  const loadCards = async () => {
    try {
      const cardsData = (await getCards(id)).data;
      setCards(cardsData);
    } catch (error) {
      console.error("Error loading cards:", error);
    }
  };

  const loadProfileInformation = async () => {
    try {
      const profileData = (await getProfileInformation()).data;
      setProfileInfo(profileData);
    } catch (error) {
      console.error("Error loading profile information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadCards();
        await loadProfileInformation();
      } catch (error) {
        console.error("Error loading information:", error);
      }
    };

    fetchData();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => prevCard + 1);
  };

  const handlePreviousCard = () => {
    setCurrentCard((prevCard) => prevCard - 1);
  };

  const suspendCard = () => {
    setShowSuspendCardModal(true);
  };

  const handleCloseSuspendCardModal = () => {
    setShowSuspendCardModal(false);
  };

  const showHelpContent = () => {
    setShowQuestionHelpModal(true);
  };

  const handleCloseQuestionHelpModal = () => {
    setShowQuestionHelpModal(false);
  };

  const handleSuspendCard = () => {
    setSuspendedCardsCount((prevCount) => prevCount + 1);
    setCards((prevCards) =>
      prevCards.filter((_, index) => index !== currentCard)
    );
  };

  return (
    <section id="questionnaire">
      {loading ? (
        <Loading />
      ) : (
        <>
          {currentCard === cards.length && profileInfo ? (
            profileInfo.currentPlan === roles.free ? (
              <UpgradePlan />
            ) : (
              <QuestionnaireDone
                topicName={topicName}
                completedCards={cards.length}
                suspendedCards={suspendCardsCount}
                relatedTopics={relatedTopics}
              />
            )
          ) : (
            <>
              <Container fluid className="p-3">
                <QuestionnaireDetails
                  topicName={topicName}
                  currentCard={currentCard}
                  cards={cards}
                  showHelpContent={showHelpContent}
                  suspendCardsCount={suspendCardsCount}
                />
                <Row className="justify-content-center pt-4">
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <CardQuestionnaire
                      card={cards[currentCard]}
                      isFirst={currentCard === 0}
                      isFlipped={isFlipped}
                      suspendCard={suspendCard}
                      handleFlip={handleFlip}
                      onPrevious={handlePreviousCard}
                      onNext={handleNextCard}
                    />
                  </Col>
                </Row>
                {isFlipped &&
                  cards.length > 0 &&
                  cards[currentCard].help !== "" && (
                    <Row className="justify-content-center pt-4">
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <AdditionalInformation
                          content={cards[currentCard].help}
                        />
                      </Col>
                    </Row>
                  )}
              </Container>
              <SuspendCardModal
                card={cards[currentCard]}
                showSuspendCardModal={showSuspendCardModal}
                handleCloseSuspendCardModal={handleCloseSuspendCardModal}
                handleSuspendCard={handleSuspendCard}
              />
              {cards.length > 0 && cards[currentCard].help !== "" && (
                <QuestionHelpModal
                  showQuestionHelpModal={showQuestionHelpModal}
                  handleCloseQuestionHelpModal={handleCloseQuestionHelpModal}
                  helpContent={cards[currentCard].help}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Questionnaire;
