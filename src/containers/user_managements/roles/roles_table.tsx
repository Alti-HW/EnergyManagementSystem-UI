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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect, useRef } from "react";
import PopoverWithMenu from "./popoverwithMenu";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

// Tooltip styles
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    padding: "10px",
  },
});

// TableRow wrapped inside a div to support `ref`
const TableRowWrapper = ({ children, index, rowRefs, ...props }: any) => {
  const rowRef = useRef<HTMLTableRowElement>(null);

  // Store the reference of each row
  useEffect(() => {
    if (rowRef.current) {
      rowRefs.current[index] = rowRef.current;
    }
  }, [index, rowRef]);

  return (
    <tr ref={rowRef} {...props} style={props.sx}>
      {children}
    </tr>
  );
};

const RolesTable = (props: any) => {
  const {
    roles = [],
    permissions = [],
    onRoleEdit,
    onRoleDelete,
    selectedRole = {},
    viewMode = false,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Create a ref array to reference each row
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // If in view mode, show all rows without pagination
  const rowsToShow = viewMode ? roles : roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Scroll to the selected row if viewMode is enabled and selectedRole is set
  useEffect(() => {
    if (viewMode && selectedRole?.id) {
      const selectedRowIndex = roles.findIndex(
        (role: any) => role?.id === selectedRole?.id
      );
      if (selectedRowIndex >= 0 && rowRefs.current[selectedRowIndex]) {
        rowRefs.current[selectedRowIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center", // You can adjust this value based on your preference
        });
      }
    }
  }, [viewMode, selectedRole, roles]);

  return (
    <Paper>
      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                  width: "25%",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="caption"> Role/Permissions</Typography>

              </TableCell>
              {permissions?.map((permission: any) => (
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }} key={permission}>
                  <Typography variant="caption"> {permission?.name}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((role: any, index: number) => (
              <TableRowWrapper
                key={index}
                index={index} // Pass the index to track the row
                rowRefs={rowRefs} // Pass rowRefs to TableRowWrapper
                sx={{
                  backgroundColor: selectedRole?.id === role?.id ? "#000000" : "inherit",
                  color: selectedRole?.id === role?.id ? "#ffff" : "inherit",
                }}
              >
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: selectedRole?.id === role?.id ? "#000000" : "#fff",
                    color: selectedRole?.id === role?.id ? "#ffff" : "inherit",
                    zIndex: 1,
                    width: "25%",
                    minWidth: '10rem',
                    fontWeight: 600
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
                  <FeatureAccessControl requiredRoles={userAccess.ADD_ROLE}>
                    {!viewMode && ( // Only show the menu if viewMode is false
                      <PopoverWithMenu
                        onRoleEdit={onRoleEdit}
                        onRoleDelete={onRoleDelete}
                        index={index}
                      />
                    )}
                  </FeatureAccessControl>
                </TableCell>
                {permissions?.map((permission: any) => (
                  <TableCell sx={{ textAlign: "center" }} key={permission}>
                    {role?.compositeRoles?.find((rl: any) => rl.id === permission.id) ? (
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
              </TableRowWrapper>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!viewMode && ( // Only show pagination if viewMode is false
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
                labelRowsPerPage="roles per page:"
                sx={{
                  ".MuiSelect-root": {
                    border: "1px solid #d6d6d6", // Add border around the select box
                    borderRadius: "4px", // Optional: add border radius for rounded corners
                  },
                  ".MuiSelect-icon": {
                    color: "#d6d6d6", // Change the icon color to match the border
                  },
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Paper>
  );
};

export default RolesTable;
