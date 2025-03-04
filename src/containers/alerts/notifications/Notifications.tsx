import { Box, Button, Typography } from "@mui/material";
import SearchBar from "../../user_managements/users/search_bar";
import NotificationsHistoryTable from "./NotificationsTable";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllNotifications } from "../../../actions/alerts";
import RefreshIcon from "@mui/icons-material/Refresh";

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selecteAllRows, setSelectAllRows] = useState(false);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (allNotifications?.length > 0) {
      let result = allNotifications.filter(({ message }: any) => {
        return message.toLowerCase().includes(text.toLowerCase());
      });
      setNotifications(result);
    }
  };
  const handleRefresh = () => {
    fetchNotifications();
  };
  const fetchNotifications = async () => {
    try {
      const response = await getAllNotifications();
      setAllNotifications(response?.data);
      setNotifications(response?.data);
    } catch (error) {}
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
      let ids = notifications?.map(({ id }: { id: string }) => id);
      setSelectedRows([...ids]);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
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
          History {notifications.length}
        </Typography>
        <SearchBar onChange={handleSearchChange} />
        <Button
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          sx={{ ml: 1 }}
        >
          Refresh
        </Button>
      </Box>
      <NotificationsHistoryTable
        notifications={notifications}
        onSelect={handleRowSelect}
        onSelectAll={handleAllSelect}
        selectedRows={selectedRows}
        selectedAll={selecteAllRows}
      />
    </Box>
  );
};

export default Notifications;
