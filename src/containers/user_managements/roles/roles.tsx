import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import RolesTable from "./roles_table";
import { permissionsMockData, rolesMockData } from "./mockData";
import { useEffect, useState } from "react";
import AddNewRole from "./add_role";
import axios from "axios";
import EditRole from "./edit_role";
import DeleteRole from "./delete_role";

const Roles = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roleAction, setRoleAction] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [responseMessage, setResponseMessage] = useState("");
  const handleOpenModal = () => {
    setRoleAction("add");
    setOpenModal(true);
  };
  const handleCloseModal = (event?: any, message?: string) => {
    setRoleAction("");
    setOpenModal(false);
    console.log(message);
    if (message) {
      setResponseMessage(message);
    }
  };
  const fetchRoles = async () => {
    const roles = await axios.get("http://localhost:5000/api/roles/list");
    console.log(roles);
    setRolesList(roles?.data?.data);
  };

  const refetchRoles = () => {
    fetchRoles();
    console.log("re call happended");
  };

  const handleEditRole = (index: number) => {
    setActiveIndex(index);
    setRoleAction("edit");
    setOpenModal(true);
    console.log("edit handler called");
  };
  const handleDeleteRole = (index: number) => {
    setActiveIndex(index);
    setRoleAction("delete");
    setOpenModal(true);
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  console.log(
    rolesList,
    activeIndex,
    rolesList[activeIndex],
    roleAction,
    openModal && roleAction === "edit"
  );
  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography sx={{ flex: 1 }}>Roles {rolesList?.length}</Typography>
        <Button
          sx={{
            fontSize: "14px",
            textTransform: "none",
            backgroundColor: "#192142",
            color: "#fff",
            padding: "5px 8px",
            height: "35px",
            ml: 2,
          }}
          onClick={handleOpenModal}
        >
          Add role
        </Button>
      </Box>
      <RolesTable
        roles={rolesList}
        permissions={permissionsMockData}
        onRoleEdit={handleEditRole}
        onRoleDelete={handleDeleteRole}
      />
      {openModal && roleAction === "add" && (
        <AddNewRole
          open={true}
          onCancel={handleCloseModal}
          onRoleCreation={refetchRoles}
        />
      )}
      {openModal && roleAction === "edit" && (
        <EditRole
          open={true}
          onCancel={handleCloseModal}
          onRoleUpdate={refetchRoles}
          role={rolesList[activeIndex]}
        />
      )}
      {openModal && roleAction === "delete" && (
        <DeleteRole
          open={true}
          onCancel={handleCloseModal}
          onRoleDeletion={refetchRoles}
          role={rolesList[activeIndex]}
        />
      )}
      <Snackbar
        open={responseMessage !== ""}
        autoHideDuration={3000}
        key={"top" + "right"}
        onClose={() => setResponseMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Roles;
