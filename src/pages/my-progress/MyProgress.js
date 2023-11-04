import { Container, Tab, Tabs } from "react-bootstrap";
import "./MyProgress.css";
import ProgressReviewed from "../../components/progress-reviewed/ProgressReviewed";
import ProgressSuspended from "../../components/progress-suspended/ProgressSuspended";
import ProgressCompleted from "../../components/progress-completed/ProgressCompleted";

const MyProgress = () => {
  return (
    <section id="my-progress">
      <Container>
        <Tabs
          defaultActiveKey="reviewed"
          id="tab-my-progress"
          className="mb-3 progress-tab"
          fill
        >
          <Tab eventKey="reviewed" title="Revisadas">
            <ProgressReviewed />
          </Tab>
          <Tab eventKey="suspended" title="Suspendidas">
            <ProgressSuspended />
          </Tab>
          <Tab eventKey="completed" title="Completadas">
            <ProgressCompleted />
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default MyProgress;
