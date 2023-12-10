import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./Profile.css";
import { getProfileInformation } from "../../api/profile.api";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";
import ContactInformation from "../../components/contact-information/ContactInformation";
import ChangePassword from "../../components/change-password/ChangePassword";
import { plans } from "../../common/constants/plans";
import Plans from "../../components/plans/Plans";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const loadProfileInformation = async () => {
    try {
      const profileData = (await getProfileInformation()).data;
      setProfileInfo(profileData);
      setEmail(profileData.email);
      setFullname(profileData.name);
    } catch (error) {
      console.error("Error loading profile information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileInformation();
  }, []);

  return (
    <Container>
      <section id="profile">
        {loading ? (
          <Loading />
        ) : (
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Container>
                <Row>
                  <Col lg={9} className="mx-auto">
                    <div className="section-title text-left mt-4 mb-1">
                      <h3 style={{ padding: 0 }}>¡Hola, {profileInfo.name}!</h3>
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <FontAwesomeIcon
                            size="lg"
                            className="fai-profile-accordion"
                            icon={faContactCard}
                          />
                          <span className="accordion-header-profile-title">
                            Información de contacto
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ContactInformation
                            email={email}
                            fullname={fullname}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <FontAwesomeIcon
                            size="lg"
                            className="fai-profile-accordion"
                            icon={faMoneyBill1}
                          />
                          <span className="accordion-header-profile-title">
                            Planes de pago{" "}
                            <span className="main-sticky badge fw-600 rounded-pill">
                              Plan {profileInfo.currentPlan}
                            </span>
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Plans
                            plans={plans.filter((p) => p.id !== 1)}
                            message={
                              profileInfo.currentPlan === "Free"
                                ? "Comenzar ahora"
                                : "Extender plan"
                            }
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <FontAwesomeIcon
                            size="lg"
                            className="fai-profile-accordion"
                            icon={faLock}
                          />
                          <span className="accordion-header-profile-title">
                            Mi contraseña
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ChangePassword />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        )}
      </section>
    </Container>
  );
};

export default Profile;
