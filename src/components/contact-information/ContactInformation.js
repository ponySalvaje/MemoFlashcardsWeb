import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { updateProfileInformation } from "../../api/profile.api";
import { storeUserData } from "../../services/indexedDB/userService";

const ContactInformation = ({ email, fullname }) => {
  const [emailForm, setEmailForm] = useState(email);
  const [fullnameForm, setFullnameForm] = useState(fullname);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({ success: "", message: "" });

  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInformation()) {
      await updateContactInformation();
    } else {
      setResult({
        success: false,
        message: "Por favor, ingrese nombres y apellidos",
      });
    }
    setShowResult(true);
  };

  const updateContactInformation = async () => {
    setLoading(true);
    try {
      await updateProfileInformation(fullnameForm);
      await storeUserData(fullnameForm);
      setResult({
        success: true,
        message: "La información de contacto ha sido actualizada",
      });
    } catch (error) {
      console.error("Error updating information:", error);
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const validateInformation = () => {
    return fullnameForm !== "";
  };

  return (
    <Form id="form-contact-information" onSubmit={handleSubmit}>
      {showResult && (
        <Alert
          variant={result.success ? "primary" : "danger"}
          onClose={() => setShowResult(false)}
          dismissible
        >
          <b>
            {result.success ? "Datos actualizados" : "¡Ups! Algo salió mal."}
          </b>
          <br />
          {result.message}
        </Alert>
      )}
      <Form.Group className="form-group" xs={12} sm={12} md={12} lg={12}>
        <Form.Label>Nombres y apellidos</Form.Label>
        <Form.Control
          type="text"
          name="fullname"
          maxLength="100"
          value={fullnameForm}
          onChange={(e) => setFullnameForm(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="form-group" xs={12} sm={12} md={12} lg={12}>
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          maxLength="100"
          value={emailForm}
          disabled={true}
          onChange={(e) => setEmailForm(e.target.value)}
        />
      </Form.Group>
      <div className="mt-3">
        <Button type="submit" variant="main" disabled={loading}>
          {loading ? (
            <Spinner animation="border" variant="white" size="sm" />
          ) : (
            <span>Editar información</span>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default ContactInformation;
