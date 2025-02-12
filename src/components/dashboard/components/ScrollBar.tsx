import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import dayjs from "dayjs";

// Type definitions for energy data
interface EnergyData {
  hour: number;
  timeLabel: string;
  consumption: number;
}

export default function EnergyDashboardScrollBar() {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const topScrollContainerRef = useRef<HTMLDivElement | null>(null); // New ref for the top scroll
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [latestHour, setLatestHour] = useState<number>(dayjs().hour()); // Track latest hour
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    fetchEnergyData(latestHour);
  }, []);

  const fetchEnergyData = async (startHour: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(true);

    console.log(`Fetching data starting from hour: ${startHour}...`);

    // Generate Mock Historical Data
    const newData: EnergyData[] = Array.from({ length: 24 }, (_, i) => ({
      hour: startHour - i,
      timeLabel: dayjs()
        .hour(startHour - i)
        .format("HH:00"), // Keep readable hour format
      consumption: Math.floor(Math.random() * 100),
    }));

    // Prepend new data and remove the oldest (cleanup)
    setEnergyData((prevData) => {
      const updatedData = [...newData, ...prevData];
      return updatedData.slice(0, 100); // Keep only the last 100 hours of data
    });

    setLatestHour(startHour - 24); // Move to the previous time range
    setIsFetching(false);
    setLoading(false);
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer && scrollContainer.scrollLeft <= 10 && !isFetching) {
      const oldScrollWidth = scrollContainer.scrollWidth;

      fetchEnergyData(latestHour);

      setTimeout(() => {
        const newScrollWidth = scrollContainer.scrollWidth;
        scrollContainer.scrollLeft += newScrollWidth - oldScrollWidth;
      }, 100);
    }
  };

  return (
    <Card sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        {/* Scrollable Container for the Chart */}
        <div
          ref={scrollContainerRef}
          style={{
            width: "100%",
            height: "400px",
            overflowX: "auto",
            whiteSpace: "nowrap",
            border: "1px solid #ccc",
          }}
          onScroll={handleScroll}
        >
          <div
            style={{ minWidth: `${energyData.length * 40}px`, height: "350px" }}
          >
            {/* Fix Chart Width */}
            <Line
              data={{
                labels: energyData.map((data) => data.timeLabel),
                datasets: [
                  {
                    label: "Energy Consumption (kWh)",
                    data: energyData.map((data) => data.consumption),
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 }, // Keep clean labels
                  },
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
