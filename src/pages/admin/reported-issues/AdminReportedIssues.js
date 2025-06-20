import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntityTable from "../../../components/entity-table/EntityTable";
import { formatDateTime } from "../../../common/utils/dateFormat";
import {
  getAdminReportedIssues,
  readAdminReportedIssue,
} from "../../../api/admin.reported-issue.api";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";

const AdminReportedIssues = () => {
  const [reportedIssues, setReportedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const checkReportedIssue = async () => {
    if (item) {
      try {
        await readAdminReportedIssue(item);
        await loadReportedIssues(id);
      } catch {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al marcar el problema como leído. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadReportedIssues = async () => {
    setLoading(true);
    try {
      const data = (await getAdminReportedIssues()).data;
      setReportedIssues(data);
    } catch (error) {
      console.error("Error loading reported issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportedIssues(id);
  }, [id]);

  const renderReportedIssues = (
    page,
    itemsPerPage,
    handleView = () => {},
    handleEdit,
    handleDelete,
    filter,
    handleCards,
    handleCheck
  ) => {
    let filtered = reportedIssues;
    if (filter && filter.trim() !== "") {
      filtered = reportedIssues.filter((issue) =>
        issue.message.toLowerCase().includes(filter.toLowerCase())
      );
    }
    const last = page * itemsPerPage;
    const first = last - itemsPerPage;
    const current = filtered.slice(first, last);

    return current.map((issue) => (
      <tr
        key={issue.id}
        className={`${
          issue.isRead ? "row-message-read" : "row-message-unread"
        }`}
      >
        <td>{issue.id}</td>
        <td>{issue.user}</td>
        <td>{issue.email}</td>
        <td>{issue.message}</td>
        <td>{formatDateTime(issue.createdAt)}</td>
        <td>
          {!issue.isRead && (
            <TableActionButtons
              itemId={issue.id}
              showView={false}
              handleCheck={handleCheck}
            />
          )}
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <EntityTable
          state={state}
          title="Problemas Reportados"
          headers={[
            "#",
            "Usuario",
            "Correo",
            "Descripción",
            "Creado el",
            "Acciones",
          ]}
          renderData={renderReportedIssues}
          itemsCount={reportedIssues.length}
          itemList={reportedIssues}
          deleteButton={checkReportedIssue}
          deleteHeader="¿Está seguro que desea marcar el problema como leído?"
          deleteMessage="Se considerará el problema como leído"
          deleteBtnLabel="Marcar leído"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminReportedIssues;
