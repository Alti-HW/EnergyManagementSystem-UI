import dayjs from "dayjs";

export const getFormatter = (type: string, value: any) => {
  switch (type) {
    case "string":
      return value?.split(" ")?.join("\n");
    case "number":
      const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact", // Use compact notation (e.g., 1K, 1M, 1B, 1T)
        compactDisplay: "short", // Use the short version (e.g., 1K instead of 1 thousand)
      });
      return formatter.format(value);
    case "date":
      const date = new Date(value);
      let dateStr = dayjs(date).format("DD/MM hh:mm A");
      dateStr?.split(" ")?.join("\n");
      return dateStr;
  }
};
