import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./QuestionHelpModal.css";

function QuestionHelpModal({
  showQuestionHelpModal,
  handleCloseQuestionHelpModal,
  helpContent,
}) {
  return (
    <Modal
      show={showQuestionHelpModal}
      onHide={handleCloseQuestionHelpModal}
      centered
      data-bs-theme="dark"
    >
      <ModalHeader className="question-help-header" closeButton>
        Ayuda
      </ModalHeader>
      <ModalBody className="question-help-body">
        <div dangerouslySetInnerHTML={{ __html: helpContent }} />
      </ModalBody>
    </Modal>
  );
}

export default QuestionHelpModal;
