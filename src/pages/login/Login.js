import { useState, useEffect } from "react";
import { Col, Form, Button, Card, Row } from "react-bootstrap";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/specialties");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <section id="login">
      <Row className="justify-content-center pt-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form id="form-registro" onSubmit={handleLogin}>
                <div className="mt-2 mb-2 text-center section-title">
                  <h3 className="mb-3">Iniciar sesión</h3>
                </div>

                <div className="login-inputs">
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

                  <Form.Group
                    className="form-group"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      autoComplete="current-password"
                      maxLength="100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="text-center">
                  <p>
                    ¿Aún no tienes cuenta?{" "}
                    <a className="option-link" href="/register">
                      Regístrate aquí
                    </a>
                  </p>
                </div>

                <div className="text-center">
                  <p>
                    ¿Olvidaste tu Contraseña?{" "}
                    <a className="option-link" href="/forgot-password">
                      Recuperar
                    </a>
                  </p>
                </div>

                <div className="mt-3">
                  <Button
                    type="submit"
                    variant="main"
                    style={{ width: "100%" }}
                  >
                    Iniciar sesión
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

export default Login;
