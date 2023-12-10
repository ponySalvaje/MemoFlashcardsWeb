import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./CulqiResult.css";
import { useLogout } from "../../hooks/useLogout";

const CulqiResult = () => {
  const { logout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state && location.state.result;
  const message = location.state && location.state.message;

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/login");
  };

  return (
    <Container>
      <Row className="justify-content-center pt-4">
        <Col xs={12} sm={6} md={6} lg={6}>
          <Card className="culqi-result-card">
            <div className="mt-4 mb-2 text-center p-4">
              <h3 className="mb-3">
                {result ? "¡Felicidades!" : "¡Lo sentimos!"}
              </h3>
              <p className="section-description">
                {result
                  ? "Tu pago ha sido procesado"
                  : "Hubo un problema al procesar tu pago."}
              </p>
              <p>
                {result
                  ? "Ahora podrás disfrutar de los beneficios de ser usuario Premium."
                  : `Error: ${message}`}
              </p>
              <p>{result && "Vuelve a iniciar sesión para comenzar."}</p>
              <div className="mt-auto">
                {result ? (
                  <Button
                    onClick={handleLogout}
                    variant="main"
                    className="btn my-1"
                  >
                    Cerrar sesión
                  </Button>
                ) : (
                  <Button
                    href="/specialties"
                    variant="main"
                    className="btn my-1"
                  >
                    Volver al menú principal
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CulqiResult;
