import { Box, Button, Typography } from "@mui/material";
import SearchBar from "../../user_managements/users/search_bar";
import NotificationsHistoryTable from "./NotificationsTable";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  deleteNotification,
  getAllNotifications,
  resolveNotification,
} from "../../../actions/alerts";
import RefreshIcon from "@mui/icons-material/Refresh";
import FeatureAccessControl from "../../../authorization/feature.access.control";
import userAccess from "../../../authorization/user.access.constants";
import { useLoader } from "../../../components/ui_components/full_page_loader.ui";

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selecteAllRows, setSelectAllRows] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const [ws, setWs] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const websocket = new WebSocket(
      "http://localhost:5057/api/alerts/ws/alerts"
    );

    websocket.onopen = () => {
      console.log("Connected to WebSocket server");
      websocket.send("get_alerts");
    };

    websocket.onmessage = (event) => {
      console.log(event);
      console.log("Received:", JSON.parse(event.data));
      setMessages((prev: any) => [...prev, event.data]);
    };

    websocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  console.log(messages);
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

  const notificationResolve = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    console.log(id, "redolve");
    showLoader();
    await resolveNotification(id);
    hideLoader();
    fetchNotifications();
  };
  const notificationDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    console.log(id, "delete");
    showLoader();
    await deleteNotification(id);
    hideLoader();
    fetchNotifications();
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
        <FeatureAccessControl requiredRoles={[...userAccess.DELETE_ALERT]}>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              display: selectedRows?.length > 0 ? "block" : "none",
            }}
            onClick={() => {}}
          >
            {selectedRows?.length > 1 ? "Delete all" : "Delete"}
          </Button>
        </FeatureAccessControl>
      </Box>
      <NotificationsHistoryTable
        notifications={notifications}
        onSelect={handleRowSelect}
        onSelectAll={handleAllSelect}
        selectedRows={selectedRows}
        selectedAll={selecteAllRows}
        onNotificationResolve={notificationResolve}
        onNotificatioDelete={notificationDelete}
      />
    </Box>
  );
};

export default Notifications;
