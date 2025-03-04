import React, { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import { Tabs, Tab, Box, Card, CardContent, Typography } from "@mui/material";
import RulesTable from "./RulesTable";

// Sample response data with severity levels
const responseData = [
  { id: 1, severity: "info", message: "This is an informational message." },
  { id: 3, severity: "critical", message: "Critical issue detected!" },
  { id: 4, severity: "info", message: "Another info message." },
];

// const severityLevels = ["all", "info", "warning", "critical"];

interface RulesTabsProps {
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

const RulesTabs = ({
  rules,
  onRuleEdit,
  onRuleDelete,
  onRuleStatusUpdate,
  onSelect,
  onSelectAll,
  selectedRows,
  selectedAll,
}: RulesTabsProps) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const severityLevels: string[] = useMemo(() => {
    const result = Array.from(new Set(rules.map((rule: any) => rule.severity)));
    return ["all", ...result];
  }, [rules]) as string[];

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  // Filter responses based on selected severity
  const filteredData =
    selectedTab === "all"
      ? rules
      : rules.filter((item: any) => item.severity === selectedTab);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Tabs for filtering */}
      <Tabs value={selectedTab} onChange={handleChange} centered>
        {severityLevels.map((level) => (
          <Tab key={level} label={level.toUpperCase()} value={level} />
        ))}
      </Tabs>

      <RulesTable
        rules={filteredData}
        onRuleDelete={onRuleDelete}
        onRuleEdit={onRuleEdit}
        onRuleStatusUpdate={onRuleStatusUpdate}
        onSelect={onSelect}
        onSelectAll={onSelectAll}
        selectedRows={selectedRows}
        selectedAll={selectedAll}
      />
    </Box>
  );
};

export default RulesTabs;
