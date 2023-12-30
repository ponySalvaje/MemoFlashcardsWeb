import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

import "./RemoveElementModal.css";

const RemoveElementModal = ({
  showRemoveModal,
  handleCloseRemoveModal,
  modalHeader,
  modalBody,
  removeElement,
}) => {
  return (
    <Modal
      show={showRemoveModal}
      onHide={handleCloseRemoveModal}
      centered
      data-bs-theme="dark"
    >
      <ModalHeader className="remove-element-header" closeButton>
        {modalHeader}
      </ModalHeader>
      <ModalBody className="remove-element-body">{modalBody}</ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={handleCloseRemoveModal}>
          Cancelar
        </Button>
        <Button variant="main" onClick={removeElement}>
          Eliminar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RemoveElementModal;
