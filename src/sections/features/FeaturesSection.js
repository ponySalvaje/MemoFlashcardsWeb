import { Container, Row, Col, Button } from "react-bootstrap";
import { Fade } from "react-reveal";
import { isAndroid, isIOS } from "react-device-detect";
import screenshotApp from "../../assets/images/screenshot_app.png";
import playStoreButton from "../../assets/images/google_plasytore_icon.png";
import appStoreButton from "../../assets/images/app_store_icon.png";
import "./FeaturesSection.css";

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
          <Col lg={6} md={6} className="content-item features-col-first">
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
          <Col lg={3} md={6} className="content-item features-col-second">
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
                    <Row>
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
          <Col lg={3} md={6} className="content-item features-col-second">
            <Fade right>
              <img
                src={screenshotApp}
                className="img-fluid img-features"
                alt="Memoflashcards screenshot"
              />
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FeaturesSection;
