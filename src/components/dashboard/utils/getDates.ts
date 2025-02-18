import dayjs from "dayjs";

export const getDates = (dateStr: string) => {
  const start = new Date("1/1/2025");
  const end = new Date("1/1/2025");
  const regex = /\d+/;
  const match = dateStr?.match(regex);
  const num = Number(match?.[0]) ?? 0;
  if (/\d{1,2}D/.test(dateStr)) {
    start.setDate(start.getDate() - num);
  } else if (/\d{1,2}W/.test(dateStr)) {
    start.setDate(start.getDate() - 7 * num);
  } else if (/\d{1,2}M/.test(dateStr)) {
    start.setMonth(start.getMonth() - num);
  } else if (/\d{1,2}Y/.test(dateStr)) {
    start.setFullYear(start.getFullYear() - num);
  }
  return {
    start: dayjs(start).format("YYYY-MM-DD"),
    end: dayjs(end).format("YYYY-MM-DD"),
  };
};

export const getUpdatedStartDate = (dateStr: string, date: string) => {
  const d = new Date(date);
  // const end = new Date("1/1/2025");
  const regex = /\d+/;
  const match = dateStr?.match(regex);
  const num = Number(match?.[0]) ?? 0;
  if (/\d{1,2}D/.test(dateStr)) {
    d.setDate(d.getDate() - num);
  } else if (/\d{1,2}W/.test(dateStr)) {
    d.setDate(d.getDate() - 7 * num);
  } else if (/\d{1,2}M/.test(dateStr)) {
    d.setMonth(d.getMonth() - num);
  } else if (/\d{1,2}Y/.test(dateStr)) {
    d.setFullYear(d.getFullYear() - num);
  }
  return dayjs(d).format("YYYY-MM-DD");
};
export const getUpdatedEndDate = (dateStr: string, date: string) => {
  const d = new Date(date);
  // const end = new Date("1/1/2025");
  const regex = /\d+/;
  const match = dateStr?.match(regex);
  const num = Number(match?.[0]) ?? 0;
  if (/\d{1,2}D/.test(dateStr)) {
    d.setDate(d.getDate() + num);
  } else if (/\d{1,2}W/.test(dateStr)) {
    d.setDate(d.getDate() + 7 * num);
  } else if (/\d{1,2}M/.test(dateStr)) {
    d.setMonth(d.getMonth() + num);
  } else if (/\d{1,2}Y/.test(dateStr)) {
    d.setFullYear(d.getFullYear() + num);
  }
  return dayjs(d).format("YYYY-MM-DD");
};
