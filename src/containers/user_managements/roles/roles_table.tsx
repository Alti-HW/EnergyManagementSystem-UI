import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    padding: "10px",
  },
});

const FixedFirstColumnTable = ({ roles, permissions }: any) => {
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
          {roles?.map((role: any, index: number) => (
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
                {role.roleName}
                <CustomWidthTooltip
                  title={role.description}
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
      </Table>
    </TableContainer>
  );
};

export default FixedFirstColumnTable;
