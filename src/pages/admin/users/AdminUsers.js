import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import { getAdminUsers, removeAdminUser } from "../../../api/admin.user.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import EntityTable from "../../../components/entity-table/EntityTable";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteUser = async () => {
    if (item) {
      try {
        await removeAdminUser(item);
        loadUsers();
        setState({
          result: true,
          message: "Usuario eliminada exitosamente!",
        });
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al eliminar el usuario. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = (await getAdminUsers()).data;
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUsers = (
    page,
    itemsPerPage,
    handleView = () => {},
    handleEdit,
    handleDelete
  ) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    return currentUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.type}</td>
        <td>
          <TableActionButtons
            itemId={user.id}
            showView={false}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
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
          title="Usuarios"
          action="Crear Usuario"
          createButton={() => navigate(`/admin/users/save/`)}
          headers={["#", "Nombre", "Correo", "Tipo", "Acciones"]}
          renderData={renderUsers}
          itemsCount={users.length}
          viewButton={(id) => navigate(`/admin/users/${id}`)}
          editButton={(id) => navigate(`/admin/users/save/${id}`)}
          deleteButton={deleteUser}
          deleteHeader="¿Está seguro que desea eliminar al usuario?"
          deleteMessage="Todos el progreso del usuario será eliminado"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminUsers;
