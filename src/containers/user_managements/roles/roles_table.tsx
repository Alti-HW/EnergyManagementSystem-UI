import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import PopoverWithMenu from "./popoverwithMenu";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    padding: "10px",
  },
});

const RolesTable = ({ roles, permissions, onRoleEdit, onRoleDelete }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                backgroundColor: "#fff",
                zIndex: 1,
                width: "25%",
              }}
            >
              Role/Permissions
            </TableCell>
            {permissions?.map((permission: string) => (
              <TableCell>{permission}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((role: any, index: number) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                    width: "25%",
                  }}
                >
                  {role?.name}
                  <CustomWidthTooltip
                    title={role?.description}
                    arrow
                    placement="right"
                  >
                    <InfoOutlinedIcon
                      sx={{
                        width: "16px",
                        height: "16px",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </CustomWidthTooltip>
                  <PopoverWithMenu
                    onRoleEdit={onRoleEdit}
                    onRoleDelete={onRoleDelete}
                    index={index}
                  />
                </TableCell>
                {permissions?.map((permission: string) => (
                  <TableCell>
                    {role?.permissions?.indexOf(permission) !== -1 ? (
                      <CheckIcon
                        sx={{ width: "20px", height: "20px", color: "#5EB082" }}
                      />
                    ) : (
                      <CloseIcon
                        sx={{ width: "20px", height: "20px", color: "#e64c4c" }}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={permissions?.length + 1}
              sx={{
                padding: 0.5,
              }}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={roles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default RolesTable;
