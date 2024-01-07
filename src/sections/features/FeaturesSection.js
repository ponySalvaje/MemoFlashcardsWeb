import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Fade } from "react-reveal";
import { isAndroid, isIOS, isMobile } from "react-device-detect";
import screenshotApp from "../../assets/images/screenshot_app.png";
import playStoreButton from "../../assets/images/google_playstore_icon.png";
import appStoreButton from "../../assets/images/app_store_icon.png";
import "./FeaturesSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faTasks } from "@fortawesome/free-solid-svg-icons";

function FeaturesSection() {
  const androidDownload = () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.memoflashcardsapp";
  };

  const iOSDownload = () => {
    window.location.href =
      "https://apps.apple.com/pe/app/memoflashcards/id6449170596?l=en-GB";
  };

  return (
    <section id="features">
      <Container>
        <Row>
          <Col
            lg={6}
            md={12}
            className={`content-item ${
              !isMobile
                ? "features-col-first-large-padding"
                : "features-col-first-small-padding"
            }`}
          >
            <Fade left>
              <h2 className="features-title">
                La forma más fácil de aprender Medicina.
              </h2>
            </Fade>
            <Fade left delay={200}>
              <p>
                Mejora rápidamente en tus notas con Memo, ahorra tiempo y
                acelera tu aprendizaje con esta herramienta fácil de usar.
              </p>
            </Fade>
            <Fade left delay={400}>
              <Button href="/specialties" variant="main" className="pull-right">
                Comenzar ahora
              </Button>
            </Fade>
          </Col>
          <Col lg={3} md={3} className="content-item features-col-second">
            <Fade right>
              <div>
                {isAndroid && (
                  <Row>
                    <img
                      src={playStoreButton}
                      className="img-download-app"
                      alt="Google playstore icon"
                      onClick={androidDownload}
                    />
                  </Row>
                )}
                {isIOS && (
                  <Row>
                    <img
                      src={appStoreButton}
                      className="img-download-app"
                      alt="App store icon"
                      onClick={iOSDownload}
                    />
                  </Row>
                )}
                {!isAndroid && !isIOS && (
                  <>
                    <Row className="mb-2">
                      <img
                        src={playStoreButton}
                        className="img-download-app"
                        alt="Google playstore icon"
                        onClick={androidDownload}
                      />
                    </Row>
                    <Row>
                      <img
                        src={appStoreButton}
                        className="img-download-app"
                        alt="App store icon"
                        onClick={iOSDownload}
                      />
                    </Row>
                  </>
                )}
              </div>
            </Fade>
          </Col>
          {!isMobile && (
            <Col
              lg={3}
              md={3}
              className="content-item features-col-third text-center"
            >
              <Fade right>
                <img
                  src={screenshotApp}
                  className="img-fluid img-features"
                  alt="Memoflashcards screenshot"
                />
              </Fade>
            </Col>
          )}
        </Row>
        {!isMobile && (
          <Row className="features-card-section">
            <Col lg={9} md={12}>
              <Card className="features-card">
                <Row>
                  <Col>
                    <div className="features-card-item">
                      <p className="features-card-item-title">
                        Método "Active Recall"
                        <FontAwesomeIcon
                          icon={faBrain}
                          className="features-card-item-icon"
                        />
                      </p>
                      <p>
                        El método de aprendizaje más eficaz. Usamos el efecto
                        testing a tu favor. Memo no solo se centra en memorizar,
                        sino en aprender!
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div className="features-card-item">
                      <p className="features-card-item-title">
                        Desirable difficulties
                        <FontAwesomeIcon
                          icon={faTasks}
                          className="features-card-item-icon"
                        />
                      </p>
                      <p>
                        Ni tan difícil, ni tan fácil. Las flashcards de Memo
                        buscan siempre el nivel de desafio optimo, que permitirá
                        acelerar tu aprendizaje.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default FeaturesSection;
