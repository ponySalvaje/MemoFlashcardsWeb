import { useEffect, useState } from "react";
import { Col, Form, Button, Card, Row, Spinner, Alert } from "react-bootstrap";
import imageSkyBlue from "../../assets/images/background_image_skyblue.png";
import imageWhite from "../../assets/images/background_image_white.png";
import { forgotPassword } from "../../api/auth.api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [`url(${imageSkyBlue})`, `url(${imageWhite})`];

  const [result, setResult] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [backgrounds.length]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setResult({
        success: true,
        message: "¡Correo de restablecimiento de contraseña enviado!",
      });
    } catch (error) {
      console.error("Error updating information:", error);
      setResult({
        success: false,
        message:
          "No se ha encontrado un usuario con esa dirección de correo electrónico",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="forgot-password"
      style={{
        backgroundImage: backgrounds[backgroundIndex],
        transition: "background-image 1s ease-in-out",
        flex: 1,
      }}
    >
      <Row className="justify-content-center pt-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form id="form-registro" onSubmit={handleForgotPassword}>
                <div className="mt-2 text-center">
                  <h3 className="mb-3">Recupera tu contraseña</h3>
                </div>
                <div className="mb-2 text-center section-title">
                  <span>
                    Ingresa el correo con el que creaste la cuenta y en breve te
                    enviaremos una contraseña nueva.
                  </span>
                </div>
                <div className="login-inputs">
                  {result && (
                    <Alert
                      variant={result.success ? "primary" : "danger"}
                      dismissible
                    >
                      <b>
                        {result.success
                          ? "Operación completada con éxito"
                          : "¡Ups! Algo salió mal."}
                      </b>
                      <br />
                      <span>{result.message}</span>
                    </Alert>
                  )}
                  <Form.Group
                    className="form-group"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      maxLength="100"
                      required
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="mt-3">
                  <Button
                    type="submit"
                    variant="main"
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="white" size="sm" />
                    ) : (
                      <span>Enviar correo</span>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
