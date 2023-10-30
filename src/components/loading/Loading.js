import { Spinner } from "react-bootstrap";
import "./Loading.css";

function Loading() {
  return (
    <div id="spinner-container">
      <Spinner animation="border" variant="main" />
    </div>
  );
}

export default Loading;
