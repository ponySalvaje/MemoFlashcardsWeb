import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { updateProfileInformation } from "../../api/profile.api";

const ContactInformation = ({ email, fullname }) => {
  const [emailForm, setEmailForm] = useState(email);
  const [fullnameForm, setFullnameForm] = useState(fullname);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileInformation(fullnameForm);
    } catch (error) {
      console.error("Error updating information:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form id="form-contact-information" onSubmit={handleSubmit}>
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
