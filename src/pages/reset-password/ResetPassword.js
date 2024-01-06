import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/auth.api";

const ResetPassword = () => {
  const { token } = useParams();

  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({ success: "", message: [] });
  const [errors, setErrors] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswordInformation()) {
      await handleResetPassword();
    } else {
      setResult({
        success: false,
        message: errors,
      });
    }
    setShowResult(true);
  };

  const validatePasswordInformation = () => {
    setErrors([]);
    if (newPassword === "")
      errors.push("Por favor, ingrese una nueva contraseña");
    if (newPassword.length < 8)
      errors.push("La nueva contraseña debe tener al menos 8 caracteres");
    if (confirmPassword === "")
      errors.push("Por favor, confirme su nueva contraseña");
    if (newPassword !== confirmPassword)
      errors.push("Las contraseñas no coinciden");
    return errors.length === 0;
  };

  const clearFields = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await resetPassword({ email, token, newPassword });
      setResult({
        success: true,
        message: [
          "Ahora podrás utilizar tu nueva contraseña para ingresar a la aplicación",
        ],
      });
      clearFields();
    } catch (error) {
      console.error("Error updating information:", error);
      setResult({
        success: false,
        message: [
          "Hubo un problema al restablecer su contraseña. Por favor, comuniquése con soporte o revise su correo.",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center pt-4">
      <Col xs={12} md={6} lg={4}>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Form id="form-reset-password" onSubmit={handleSubmit}>
              <div className="mt-2 mb-2 text-center section-title">
                <h3 className="mb-3">Restablecer contraseña</h3>
              </div>

              {showResult && (
                <Alert
                  variant={result.success ? "primary" : "danger"}
                  onClose={() => {
                    setShowResult(false);
                    setErrors([]);
                  }}
                  dismissible
                >
                  <b>
                    {result.success
                      ? "Contraseña restablecida con éxito"
                      : "¡Ups! Algo salió mal."}
                  </b>
                  <br />
                  <ul>
                    {result.message.map((err) => {
                      return <li key={err}>{err}</li>;
                    })}
                  </ul>
                </Alert>
              )}
              <Form.Control
                type="text"
                name="username"
                autoComplete="username"
                style={{ display: "none" }}
                aria-hidden="true"
                tabIndex="-1"
              />
              <Form.Group
                className="form-group"
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  name="email"
                  maxLength="100"
                  value={email}
                  autoComplete="username"
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="form-group"
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Form.Label>Contraseña nueva</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  maxLength="100"
                  value={newPassword}
                  autoComplete="new-password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="form-group"
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  maxLength="100"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mt-3">
                <Button
                  type="submit"
                  variant="main"
                  disabled={loading}
                  style={{ width: "100%" }}
                >
                  {loading ? (
                    <Spinner animation="border" variant="white" size="sm" />
                  ) : (
                    <span>Restablecer contraseña</span>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
