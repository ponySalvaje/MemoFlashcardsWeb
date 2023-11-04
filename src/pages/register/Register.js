import { useState, useEffect } from "react";
import { Col, Form, Button, Card, Row, Spinner, Alert } from "react-bootstrap";
import { semesters } from "../../common/constants/semesters";
import { universities } from "../../common/constants/universities";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { signup, error, isLoading } = useSignup();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/specialties");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (validateInfo()) {
      await signup({ name: fullName, email: email, password: password });
    }
  };

  const validateInfo = () => {
    let isValid = true;
    let newErrors = [];
    if (password.length < 8) {
      newErrors = [
        ...newErrors,
        "La contraseña debe tener al menos 8 caracteres",
      ];
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors = [...newErrors, "Las contraseñas no coinciden"];
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <section id="register">
      <Row className="justify-content-center pt-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form onSubmit={handleRegister}>
                <div className="mt-2 mb-2 text-center section-title">
                  <h3 className="mb-3">Crea una cuenta para comenzar</h3>
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="option-link">
                      Inicia sesión aquí
                    </a>
                  </p>
                </div>

                <div className="register-inputs">
                  {(error || errors.length > 0) && (
                    <Alert variant="danger" dismissible>
                      <b>¡Ups! Algo salió mal.</b>
                      <br />
                      <ul>
                        {error && (
                          <li>El correo ingresado ya está siendo utilizado.</li>
                        )}
                        {errors.map((err) => {
                          return <li key={err}>{err}</li>;
                        })}
                      </ul>
                    </Alert>
                  )}
                  <Form.Group className="form-group">
                    <Form.Label>Nombres y apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      maxLength="100"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      maxLength="100"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="username"
                    />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Soy un estudiante de</Form.Label>
                    <Form.Control
                      as="select"
                      name="semester"
                      required
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <option value="">Selecciona</option>
                      {semesters.map((semesterOption) => (
                        <option
                          key={semesterOption.value}
                          value={semesterOption.value}
                        >
                          {semesterOption.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Universidad</Form.Label>
                    <Form.Control
                      as="select"
                      name="university"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    >
                      <option value="">Selecciona</option>
                      {universities.map((universityOption) => (
                        <option
                          key={universityOption.value}
                          value={universityOption.value}
                        >
                          {universityOption.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Crea una contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Form.Group>
                </div>

                <div className="mt-3">
                  <Button
                    type="submit"
                    variant="main"
                    style={{ width: "100%" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" variant="white" size="sm" />
                    ) : (
                      <span>Registrarse</span>
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

export default Register;
