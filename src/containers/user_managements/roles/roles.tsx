import { Box, Button, Typography } from "@mui/material";
import FixedFirstColumnTable from "./roles_table";
import { permissionsMockData, rolesMockData } from "./mockData";
import { useState } from "react";
import AddNewRole from "./add_role";

const Roles = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleAddRole = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography sx={{ flex: 1 }}>Roles {rolesMockData?.length}</Typography>
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
      <FixedFirstColumnTable
        roles={rolesMockData}
        permissions={permissionsMockData}
      />
      <AddNewRole open={openModal} handleAddRoleModel={handleAddRole} />
    </Box>
  );
};

export default Roles;
