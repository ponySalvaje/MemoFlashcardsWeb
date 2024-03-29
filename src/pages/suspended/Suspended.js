import { Container, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import "./Suspended.css";
import Loading from "../../components/loading/Loading";
import { useState, useEffect } from "react";
import { getSuspendedGroups, postBulkUnsuspend } from "../../api/progress.api";
import { useLocation, useParams } from "react-router-dom";
import SuspendedGroup from "../../components/suspended-group/SuspendedGroup";
import memoCharacter from "../../assets/images/character_image.png";

const Suspended = () => {
  const [suspendedGroups, setSuspendedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBulk, setLoadingBulk] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const specialtyName = location.state && location.state.specialtyName;

  const loadSuspended = async () => {
    try {
      const suspendedGroupsData = (await getSuspendedGroups(id)).data;
      setSuspendedGroups(suspendedGroupsData);
    } catch (error) {
      console.error("Error loading suspended cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuspended();
  }, []);

  const handleUnsuspendAll = async () => {
    setLoadingBulk(true);
    try {
      await postBulkUnsuspend(id);
      await loadSuspended();
    } catch (error) {
      console.error("Error unsuspending all cards:", error);
    } finally {
      setLoadingBulk(false);
    }
  };

  return (
    <section id="suspended">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="mt-4 mb-2 text-center section-title">
              <h3 className="mb-3">
                Tarjetas suspendidas de <b>{specialtyName}</b>
              </h3>
            </div>
            <Row>
              <Col xs={12} md={6}>
                {suspendedGroups.map((suspendedGroupItem) => {
                  return (
                    <SuspendedGroup
                      key={suspendedGroupItem.subjectId}
                      item={suspendedGroupItem}
                      callback={loadSuspended}
                    />
                  );
                })}
              </Col>
              <Col xs={6} md={3} className="text-center mb-3 mb-md-0 p-t-20">
                <Image
                  src={memoCharacter}
                  alt="Memo character"
                  className="memo-character-img img-fluid"
                />
              </Col>
              <Col xs={6} md={3} className="text-center p-t-20">
                <span className="unsuspend-all-title">
                  ¿Buscando un nuevo comienzo en {specialtyName}?
                </span>
                <div className="unsuspend-all-button">
                  <Button
                    variant="main"
                    onClick={handleUnsuspendAll}
                    disabled={loadingBulk}
                  >
                    {loadingBulk ? (
                      <Spinner animation="border" variant="white" size="sm" />
                    ) : (
                      <span>Habilitar todas</span>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
};

export default Suspended;
