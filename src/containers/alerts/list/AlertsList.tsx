import { Box, Button, Drawer, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import CreateAlert from "./CreateAlert";
import RulesTable from "./RulesTable";
import SearchBar from "../../user_managements/users/search_bar";
import { useConfirmationDialog } from "../../../components/ui_components/confirmation_dialog.ui";
import { deleteRule, getAllRules, updateRule } from "../../../actions/alerts";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";

const AlertsList = () => {
  const [openCreateRuleModal, setOpenCreateRuleModal] = useState(false);
  const [allRules, setAllRules] = useState<any>([]);
  const [rules, setRules] = useState<any>([]);
  const [activeRule, setActiveRule] = useState();
  const { openDialog } = useConfirmationDialog();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selecteAllRows, setSelectAllRows] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const fetchRules = async () => {
    return getAllRules().then((response: any) => {
      setAllRules(response);
      setRules(response);
    });
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (allRules?.length > 0) {
      let result = allRules.filter(({ alert }: any) => {
        return alert.toLowerCase().includes(text.toLowerCase());
      });
      setRules(result);
    }
  };
  const handleRuleDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    ruleId?: string
  ) => {
    const rule = rules.find((rule: any) => rule.alert === ruleId);
    if (rule) {
      setActiveRule(rule);
    }
    const userResponse = await openDialog(
      `Do you really want to delete ${
        rule ? `${rule.alert} Rule` : "all Rules"
      }`, // message
      "Delete Rule" // title
    );
    if (userResponse) {
      showLoader();
      if (ruleId) await deleteRule(`${ruleId}`);
      else await Promise.all(selectedRows.map((i) => deleteRule(i)));
      await fetchRules();
      hideLoader();
    }
  };
  const handleRuleEdit = (e: MouseEvent<HTMLButtonElement>, ruleId: string) => {
    // setActiveRule(rules[index]);
    const rule = rules.find((rule: any) => rule.alert === ruleId);
    setActiveRule(rule);
    setOpenCreateRuleModal(true);
  };

  const handleRowSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e?.target?.checked) {
      setSelectedRows((rows) => [...rows, id]);
    } else {
      const index = selectedRows?.findIndex((row) => row === id);
      setSelectedRows((rows) => {
        rows.splice(index, 1);
        return [...rows];
      });
    }
  };

  const handleAllSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectAllRows(event?.target.checked);
    if (event?.target.checked) {
      let ids = rules?.map(({ alert }: { alert: string }) => alert);
      setSelectedRows([...ids]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRuleCreate = () => {
    fetchRules();
  };

  const handleStatusToggle = async (
    e: ChangeEvent<HTMLInputElement>,
    ruleId: string
  ) => {
    const rule = rules.find((rule: any) => rule.id === ruleId);
    rule.isEnabled = e.target.checked;
    await updateRule(rule, ruleId);
    fetchRules();
  };

  const handleCloseModal = () => {
    setOpenCreateRuleModal(false);
    setActiveRule(undefined);
  };
  return (
    <Box sx={{ p: 4, backgroundColor: "transparent" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          variant="h6"
          sx={{ flex: 1, color: "#6e6e6e", fontSize: "16px" }}
        >
          Rules {rules.length}
        </Typography>
        <SearchBar onChange={handleSearchChange} />
        <FeatureAccessControl requiredRoles={[...userAccess.ADD_ALERT_RULE]}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenCreateRuleModal(true)}
            sx={{ ml: 1 }}
          >
            Add New Rule
          </Button>
        </FeatureAccessControl>
        <FeatureAccessControl requiredRoles={[...userAccess.DELETE_ALERT_RULE]}>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              display: selectedRows?.length > 0 ? "block" : "none",
            }}
            onClick={handleRuleDelete}
          >
            {selectedRows?.length > 1 ? "Delete all" : "Delete"}
          </Button>
        </FeatureAccessControl>
      </Box>
      <RulesTable
        rules={rules}
        onRuleDelete={handleRuleDelete}
        onRuleEdit={handleRuleEdit}
        onRuleStatusUpdate={handleStatusToggle}
        onSelect={handleRowSelect}
        onSelectAll={handleAllSelect}
        selectedRows={selectedRows}
        selectedAll={selecteAllRows}
      />
      <Drawer
        open={openCreateRuleModal}
        onClose={handleCloseModal}
        anchor="right"
        PaperProps={{
          sx: { width: "45%" },
        }}
      >
        {openCreateRuleModal && (
          <CreateAlert
            onCancel={handleCloseModal}
            onRuleCreate={handleRuleCreate}
            rule={activeRule}
          />
        )}
      </Drawer>
      {/* {rules.length > 0 && (
        <RulesTabs
          rules={rules}
          onRuleDelete={handleRuleDelete}
          onRuleEdit={handleRuleEdit}
          onRuleStatusUpdate={handleStatusToggle}
          onSelect={handleRowSelect}
          onSelectAll={handleAllSelect}
          selectedRows={selectedRows}
          selectedAll={selecteAllRows}
        />
      )} */}
    </Box>
  );
};

export default AlertsList;
