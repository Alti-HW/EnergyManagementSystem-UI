import React, { ChangeEvent, MouseEvent, ReactElement, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TableFooter,
  TablePagination,
  Checkbox,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dateNtimeUtils from "../../../utils/datentime.utils";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

interface RulesTableProps {
  rules: any[];
  onRuleEdit: (e: MouseEvent<HTMLButtonElement>, ruleId: string) => void;
  onRuleDelete: (e: MouseEvent<HTMLButtonElement>, ruleId: string) => void;
  onRuleStatusUpdate: (
    e: ChangeEvent<HTMLInputElement>,
    ruleId: string
  ) => void;
  onSelect: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedRows: string[];
  selectedAll: boolean;
}
interface SeverityMappingProps {
  [key: string]: {
    label: string;
    Icon: ReactElement<any, any>;
    color: string;
  };
}
const SeverityMapping: SeverityMappingProps = {
  info: {
    label: "Info",
    Icon: (
      <InfoIcon sx={{ color: "rgb(2, 136, 209)", width: "20px", mr: 0.5 }} />
    ),
    color: "rgb(2, 136, 209)",
  },
  warning: {
    label: "Warning",
    Icon: (
      <WarningAmberIcon
        sx={{ color: "rgb(237, 108, 2);", width: "20px", mr: 0.5 }}
      />
    ),
    color: "rgb(237, 108, 2)",
  },
  critical: {
    label: "Critical",
    Icon: (
      <DangerousIcon
        sx={{ color: "rgb(211, 47, 47);", width: "20px", mr: 0.5 }}
      />
    ),
    color: "rgb(211, 47, 47);",
  },
};

const DetailsLabel: { [key: string]: string } = {
  name: "Name",
  description: "Description",
  expression: "Expression",
  duration: "Duration",
  isEnabled: "Is Enabled",
  severity: "Severity",
};
const RulesTable = ({
  rules,
  onRuleEdit,
  onRuleDelete,
  onRuleStatusUpdate,
  onSelect,
  onSelectAll,
  selectedRows,
  selectedAll,
}: RulesTableProps) => {
  // Sample Data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDetails, setShowDetails] = useState(false);
  const [activeItem, setActiveItem] = useState<any>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetails = (id: string) => {
    setShowDetails(true);
    const item = rules.find((rule: any) => rule.id === id);
    setActiveItem(item);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
    setActiveItem(undefined);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ margin: "auto", mt: 4 }}>
        <Table sx={{ tableLayout: "fixed" }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "45px" }}>
                <Checkbox
                  sx={{ transform: "scale(0.8)" }}
                  checked={selectedAll}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelectAll(e);
                  }}
                />
              </TableCell>
              <TableCell sx={{ width: "30%" }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Severity
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Date added
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {rules.length > 0 &&
              rules
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rule, index) => (
                  <TableRow
                    key={rule.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDetails(rule.id)}
                  >
                    <TableCell sx={{ width: "45px" }}>
                      <Checkbox
                        sx={{ transform: "scale(0.8)" }}
                        checked={selectedRows.indexOf(rule?.id) !== -1}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(e) => onSelect(e, rule?.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{rule.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            SeverityMapping[rule?.severity?.toLowerCase()]
                              ?.color,
                        }}
                      >
                        {SeverityMapping[rule?.severity?.toLowerCase()].Icon}
                        {SeverityMapping[rule?.severity?.toLowerCase()].label}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption">
                        {dateNtimeUtils.timeAgo(rule.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        size="small"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#fff", // Thumb color when ON
                            "& + .MuiSwitch-track": {
                              backgroundColor: "green", // Green track when ON
                              opacity: 1,
                            },
                          },
                          "& .MuiSwitch-switchBase": {
                            color: "#fff", // Thumb color when OFF
                            "& + .MuiSwitch-track": {
                              backgroundColor: "red", // Red track when OFF
                              opacity: 1,
                            },
                          },
                        }}
                        checked={rule.isEnabled}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onRuleStatusUpdate(e, rule.id)}
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          onRuleEdit(e, rule.id);
                        }}
                      >
                        <BorderColorIcon
                          sx={{ width: "12px", height: "12px" }}
                        />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRuleDelete(e, rule.id);
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{ width: "16px", height: "16px" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rules.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Rules per page:"
                  sx={{
                    ".MuiSelect-root": {
                      border: "1px solid #d6d6d6",
                      borderRadius: "4px",
                    },
                    ".MuiSelect-icon": {
                      color: "#d6d6d6",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={showDetails}
        onClose={handleDetailsClose}
        PaperProps={{
          sx: { minWidth: "500px" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ textAlign: "center", flex: 1 }}>Details</Typography>
          <IconButton
            sx={{
              height: "fit-content",
              border: "1px solid #b7adad",
              borderRadius: "50%",
              padding: "4px",
            }}
            onClick={handleDetailsClose}
          >
            <CloseIcon sx={{ width: "16px", height: "16px", color: "#000" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Card sx={{ backgroundColor: "#F6F7FB" }}>
            <CardContent>
              <Stack
                spacing={2}
                direction="column"
                justifyContent="space-between"
              >
                {Object.keys(DetailsLabel)?.map((key: string) => (
                  <Typography variant="caption" color="" key={key}>
                    <strong>{DetailsLabel[key]}:</strong>
                    {key === "expression"
                      ? ` ${activeItem?.metric} ${activeItem?.expression} ${activeItem?.threshold}`
                      : ` ${activeItem?.[key]}`}
                  </Typography>
                ))}
              </Stack>
              <Stack
                spacing={2}
                direction="column"
                justifyContent="space-between"
                sx={{ mt: 4 }}
              >
                <Typography variant="caption" color="">
                  <strong>Created date:</strong>{" "}
                  {new Date(activeItem?.createdAt).toDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RulesTable;
