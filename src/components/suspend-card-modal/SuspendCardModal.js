import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";
import "./SuspendCardModal.css";
import { scoreCard } from "../../api/scores.api";
import scoreGrades from "../../common/constants/scoreGrades";

function SuspendCardModal({
  card,
  showSuspendCardModal,
  handleCloseSuspendCardModal,
  handleSuspendCard,
}) {
  const suspendCard = async () => {
    handleCloseSuspendCardModal();
    handleSuspendCard();
    await scoreCard(card.id, scoreGrades.suspended);
  };

  return (
    <Modal
      show={showSuspendCardModal}
      onHide={handleCloseSuspendCardModal}
      centered
      data-bs-theme="dark"
    >
      <ModalHeader className="suspend-card-header" closeButton>
        ¿Estás seguro de que quieres suspender?
      </ModalHeader>
      <ModalBody className="suspend-card-body">
        <div>
          Suspender una tarjeta la sacará de tus sesiones de estudio de ahora en
          adelante. Pero tranquilo, podrás volverla a activar en el buscador de
          suspendidas.
        </div>
        <div className="suspend-card-modal-buttons">
          <Row>
            <Col>
              <div className="mt-auto">
                <Button
                  onClick={handleCloseSuspendCardModal}
                  variant="second"
                  className="btn my-1"
                >
                  Cancelar
                </Button>
              </div>
            </Col>
            <Col>
              <div className="mt-auto">
                <Button
                  onClick={suspendCard}
                  variant="main"
                  className="btn my-1"
                >
                  Suspender
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default SuspendCardModal;
