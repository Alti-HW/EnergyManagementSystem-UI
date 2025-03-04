import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  IconButton,
  Card,
  Switch,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { createRule, updateRule } from "../../../actions/alerts";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";
import { useSnackbar } from "../../../components/ui_components/alert.ui";

type AlertData = {
  name: string;
  metric: string;
  severity: string;
  description?: string;
  expression: string;
  threshold: string;
  enableInAppNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSlackNotifications: boolean;
};
type CreateAlertProps = {
  onCancel: () => void;
  onRuleCreate: () => void;
  rule: any;
};
const severityLevels = [
  { label: "Info", value: "info" },
  { label: "Warning", value: "warning" },
  { label: "Critical", value: "critical" },
];

const expressions = [
  { label: "Greater than", value: ">" },
  { label: "Greater than or equals to", value: ">=" },
  { label: "Equals to", value: "=" },
  { label: "Less than", value: "<" },
  { label: "Less than or equals to", value: "<=" },
];
const metrics = [
  { label: "Energy Consumed", value: "energy_consumed_kwh" },
  { label: "Peak load", value: "peak_load_kw" },
  { label: "Average temperature", value: "avg_temperature_c" },
  { label: "CO2 Emission", value: "co2_emissions_kg" },
];

const CreateAlert = ({ onCancel, onRuleCreate, rule }: CreateAlertProps) => {
  const [alertData, setAlertData] = useState<AlertData>({
    name: rule ? rule.name : "",
    description: rule ? rule.description : "",
    metric: rule ? rule.metric : "",
    severity: rule ? rule?.severity?.toLowerCase() : "",
    expression: rule ? rule?.expression : "",
    threshold: rule ? rule.threshold : "",
    enableInAppNotifications: false,
    enableEmailNotifications: false,
    enableSlackNotifications: false,
  });
  const { showLoader, hideLoader } = useLoader();
  const { showSnackbar } = useSnackbar();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertData({ ...alertData, [event.target.name]: event.target.value });
  };

  console.log(rule, alertData.expression);

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    key: string
  ) => {
    setAlertData({ ...alertData, [key]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: alertData.name,
      description: alertData.description,
      metric: alertData.metric,
      severity: alertData.severity,
      threshold: alertData.threshold,
      expression: alertData.expression,
      duration: "10m",
    };
    try {
      showLoader();
      let response;
      if (rule) response = await updateRule({ ...rule, ...payload }, rule.id);
      else response = await createRule(payload);
      if (response) {
        showSnackbar(response?.message, "success");
        onRuleCreate();
        onCancel();
      }
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.ErrorMessage ||
          "Error while creating user. Please try again.",
        "error"
      );
    } finally {
      hideLoader();
    }
  };

  const handleToggleBtnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setAlertData({ ...alertData, [key]: event.target.checked });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          sx={{ flex: 1, fontSize: "16px", fontWeight: "700" }}
        >
          {rule ? "Update Rule" : "Create new alert rule"}
        </Typography>

        <IconButton
          sx={{
            height: "fit-content",
            marginTop: "-16px",
            marginRight: "-16px",
            border: "1px solid #b7adad",
            borderRadius: "50%",
            padding: "4px",
          }}
          onClick={onCancel}
        >
          <CloseIcon sx={{ width: "16px", height: "16px", color: "#000" }} />
        </IconButton>
      </Box>
      <Typography
        variant="caption"
        sx={{ fontSize: "12px", mb: 2, display: "inline-block" }}
      >
        Receive notifications when defined triggered conditions are matched
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ backgroundColor: "#F6F7FB", padding: "8px 16px" }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", mb: 2, display: "inline-block" }}
          >
            General
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="caption" sx={{ width: "30%" }}>
              Alert name
            </Typography>
            {/* Alert Name */}
            <TextField
              fullWidth
              label="Alert Name"
              name="name"
              variant="outlined"
              required
              value={alertData.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="caption" sx={{ width: "30%" }}>
              Summary
            </Typography>
            {/* Alert Name */}
            <TextField
              multiline
              rows={2}
              maxRows={2}
              fullWidth
              label="Alert Summary"
              name="description"
              variant="outlined"
              value={alertData.description}
              onChange={handleInputChange}
            />
          </Box>
        </Card>
        <Card sx={{ backgroundColor: "#F6F7FB", padding: "8px 16px", mt: 2 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", mb: 2, display: "inline-block" }}
          >
            Triggering conditions
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
                width: "40%",
              }}
            >
              <Typography variant="caption" sx={{ mb: 1 }}>
                Metric
              </Typography>
              {/* Alert Name */}
              <FormControl fullWidth>
                <InputLabel>Metric</InputLabel>
                <Select
                  name="metric"
                  id={"metric"}
                  value={alertData.metric}
                  onChange={(e) => handleSelectChange(e, "metric")} // Uses separate handler
                  required
                >
                  {metrics.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      <Typography variant="caption">{label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                mb: 2,
                flexDirection: "column",
                width: "30%",
              }}
            >
              <Typography variant="caption" sx={{ mb: 1 }}>
                Expression
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Expression</InputLabel>
                <Select
                  name="condition"
                  labelId={"expression_condition_label"}
                  id={"expression"}
                  value={alertData.expression}
                  onChange={(e) => handleSelectChange(e, "expression")} // Uses separate handler
                  required
                >
                  {expressions.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      <Typography variant="caption">{label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                flexDirection: "column",
                width: "30%",
              }}
            >
              <Typography variant="caption" sx={{ mb: 1 }}>
                Threshold
              </Typography>
              <TextField
                fullWidth
                label="Threshold"
                name="threshold"
                variant="outlined"
                required
                value={alertData.threshold}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="caption" sx={{ width: "30%" }}>
              Severity
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Severity</InputLabel>
              <Select
                name="severity"
                labelId={"alert_severity_label"}
                id={"alert_severity"}
                value={alertData.severity}
                required
                onChange={(e) => handleSelectChange(e, "severity")} // Uses separate handler
              >
                {severityLevels.map(({ label, value }) => (
                  <MenuItem key={label} value={value}>
                    <Typography variant="caption">{label}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Card>
        <Card sx={{ backgroundColor: "#F6F7FB", padding: "8px 16px", mt: 2 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", mb: 2, display: "inline-block" }}
          >
            Notifications
          </Typography>

          <Box display={"flex"} sx={{ mb: 1 }}>
            <Switch
              checked={alertData?.enableInAppNotifications}
              onChange={(e) =>
                handleToggleBtnChange(e, "enableInAppNotifications")
              }
            />
            <Box sx={{ margin: "8px 0 0 16px ", width: "300px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                In app
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Keep taps of all alerts notifications in dashboard
              </Typography>
            </Box>
          </Box>

          <Box display={"flex"} sx={{ mb: 1 }}>
            <Switch
              checked={alertData?.enableEmailNotifications}
              onChange={(e) =>
                handleToggleBtnChange(e, "enableEmailNotifications")
              }
            />
            <Box sx={{ margin: "8px 0 0 16px ", width: 300 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                Email Notifications
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Please seperate the list of emails with , or ;
              </Typography>
              {alertData?.enableEmailNotifications && (
                <TextField
                  multiline
                  rows={2}
                  maxRows={2}
                  fullWidth
                  label="List of emails"
                  name="listOfEmails"
                  variant="outlined"
                  required
                  // value={alertData.alertName}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </Box>
          <Box display={"flex"} sx={{ mb: 1 }}>
            <Switch
              checked={alertData?.enableSlackNotifications}
              onChange={(e) =>
                handleToggleBtnChange(e, "enableSlackNotifications")
              }
            />
            <Box sx={{ margin: "8px 0 0 16px ", width: "300px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                Slack
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                please enter the slack channel
              </Typography>
              {alertData?.enableSlackNotifications && (
                <TextField
                  fullWidth
                  label="slack channel"
                  name="slackChannel"
                  variant="outlined"
                  required
                  // value={alertData.alertName}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </Box>
        </Card>
        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            mt: 2,
          }}
        >
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "fit-content" }}
            color="primary"
            fullWidth
          >
            {rule ? "Update Alert" : "Create Alert"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateAlert;
