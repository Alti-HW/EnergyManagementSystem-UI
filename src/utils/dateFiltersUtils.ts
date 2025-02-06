import { Dayjs } from "dayjs";

export const periodCalculatorForLastSelector = (
  value: string
): { start: Date; end: Date } => {
  let start = new Date();
  let end = new Date();
  // const value = event.target.value
  console.log(value);
  switch (value) {
    case "1min":
    case "5min":
    case "10min":
    case "30min": {
      const min = Number(value.replace("min", ""));
      start.setMinutes(start.getMinutes() - min);
      break;
    }
    case "1hr":
    case "5hr":
    case "12hr": {
      const hr = Number(value.replace("hr", ""));
      start.setHours(start.getHours() - hr);
      break;
    }
    case "1day":
    case "7day":
    case "30day": {
      const day = Number(value.replace("day", ""));
      start.setDate(start.getDate() - day);
      break;
    }
  }
  return { start, end };
};
const calculateQuarter = (
  isCurrentQuarter: boolean
): { start: Date; end: Date } => {
  let today = new Date();
  let currentMonth = today.getMonth();
  let quarterStartMonth;
  if (currentMonth >= 0 && currentMonth <= 2) {
    // Q1
    quarterStartMonth = isCurrentQuarter ? 0 : 9; // October (Q4 of the previous year)
    if (!isCurrentQuarter) today.setFullYear(today.getFullYear() - 1); // Move back to the previous year
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    // Q2
    quarterStartMonth = isCurrentQuarter ? 3 : 0;
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    // Q3
    quarterStartMonth = isCurrentQuarter ? 6 : 3;
  } else {
    // Q4
    quarterStartMonth = isCurrentQuarter ? 9 : 6;
  }

  let start = new Date(today.getFullYear(), quarterStartMonth, 1);
  let end = new Date(today.getFullYear(), quarterStartMonth + 3, 0); // Set day to 0 to get the last day of the month
  return { start, end };
};

const calculateHalfYear = (
  isCurrentHalfYear: boolean
): { start: Date; end: Date } => {
  let today = new Date();
  let currentMonth = today.getMonth();
  let start, end;

  if (currentMonth >= 0 && currentMonth <= 5) {
    // Current month is in the first half (Jan-Jun)
    if (isCurrentHalfYear) {
      start = new Date(today.getFullYear(), 0, 1); // January 1st
      end = new Date(today.getFullYear(), 5, 30); // June 30th
    } else {
      start = new Date(today.getFullYear() - 1, 6, 1); // July 1st of the previous year
      end = new Date(today.getFullYear() - 1, 11, 31); // December 31st of the previous year
    }
  } else {
    // Current month is in the second half (Jul-Dec)
    // Previous half-year is January to June of the current year
    if (isCurrentHalfYear) {
      start = new Date(today.getFullYear(), 6, 1); // July 1st
      end = new Date(today.getFullYear(), 11, 31); // December 31st
    } else {
      start = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
      end = new Date(today.getFullYear(), 5, 30); // June 30th of the current year
    }
  }
  return { start, end };
};

export const periodCalculatorForRelativeSelector = (
  value: string
): { start: Date; end: Date } => {
  let start = new Date();
  let end = new Date();
  switch (value) {
    case "yesterday":
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case "dayBeforeYesterday":
      start.setDate(start.getDate() - 2);
      end.setDate(end.getDate() - 2);
      break;
    case "thisDayLastWeek":
      start.setDate(start.getDate() - 7);
      end.setDate(end.getDate() - 7);
      break;
    case "preWeekSun_Sat":
      start.setDate(start.getDate() - (start.getDay() + 7));
      end.setDate(end.getDate() - (end.getDay() + 1));
      break;
    case "preWeekMon_Sun":
      start.setDate(start.getDate() - (start.getDay() + 6));
      end.setDate(end.getDate() - end.getDay());
      break;
    case "preMonth":
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case "preQuarter":
      return calculateQuarter(false);
    case "preHalfYear":
      return calculateHalfYear(false);
    case "preYear":
      start = new Date(start.getFullYear() - 1, 0, 1);
      end = new Date(end.getFullYear() - 1, 11, 31);
      break;
    case "currentDay":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "currentWeekSun_Sat":
      start.setDate(start.getDate() + (0 - start.getDay())); //start date is sunday
      end.setDate(end.getDate() + (6 - end.getDay())); // end date is saturday
      break;

    case "currentWeekMon_Sun":
      const daysToMon = start.getDay() === 0 ? 6 : start.getDay() - 1;
      start.setDate(start.getDate() - daysToMon);
      end.setDate(start.getDate() + 6);
      break;

    case "currentMonth":
      start.setDate(1);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      break;
    case "currentQuarter":
      return calculateQuarter(true);

    case "currentHalfYear":
      return calculateHalfYear(true);
    case "currentYear":
      start = new Date(start.getFullYear(), 0, 1);
      end = new Date(start.getFullYear(), 11, 31);
      break;
  }
  return { start, end };
};
