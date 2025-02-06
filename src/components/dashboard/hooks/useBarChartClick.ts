import { BarItemIdentifier } from "@mui/x-charts";
import { useState, MouseEvent } from "react";

// Define the data structure for the chart
interface ChartData {
  buildingName: string;
  buildingId: number;
}

// Define the return type of the hook
interface ClickState {
  selectedLabel: string | null;
  menuPosition: { mouseX: number; mouseY: number } | null;
  handleBarClick: (event: MouseEvent, item: BarItemIdentifier) => void;
  handleClose: () => void;
  buildingId: number | null;
}
// Custom hook for handling bar click events
export function useBarChartClick(data: ChartData[]): ClickState {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedBuidlingId, setSelectedBuidlingId] = useState<number | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  // Handle bar click event
  const handleBarClick = (event: MouseEvent, item: BarItemIdentifier) => {
    event.preventDefault(); // Prevent default behavior (optional)
    if (item.dataIndex !== undefined) {
      // setSelectedLabel(data[item.dataIndex].buildingName); // Get correct label dynamically
      // setMenuPosition({ mouseX: event.clientX, mouseY: event.clientY });
      setSelectedBuidlingId(data[item.dataIndex].buildingId);
    }
  };
  // Close the context menu
  const handleClose = () => {
    setSelectedLabel(null);
    setMenuPosition(null);
  };
  return {
    selectedLabel,
    menuPosition,
    handleBarClick,
    handleClose,
    buildingId: selectedBuidlingId,
  };
}
