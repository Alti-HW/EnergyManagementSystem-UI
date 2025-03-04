import axios from "axios";
import { alerts } from "../constants/apis";

interface Rule {
  name: string;
  metric: string;
  expression: string;
  threshold: number;
  severity: string;
  duration: string;
  description: string;
}

export const getAllRules = async () => {
  try {
    const response = await axios.get(alerts.allRules, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
};

export const createRule = async (payload: any) => {
  try {
    const response = await axios.post(
      alerts.createRule,
      { applicationId: "e6f01516-dcdf-4970-9133-69ab5477f082", ...payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data || {};
  } catch (err) {
    console.error("Error while creating rule data", err);
    throw err;
  }
};

export const updateRule = async (payload: any, ruleId: string) => {
  console.log(payload, ruleId);
  try {
    const response = await axios.put(
      `${alerts.updateRule}/${ruleId}`,
      { applicationId: "e6f01516-dcdf-4970-9133-69ab5477f082", ...payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data || {};
  } catch (err) {
    console.error("Error while updating rule data", err);
    throw err;
  }
};
export const deleteRule = async (ruleId: string) => {
  try {
    const response = await axios.delete(`${alerts.deleteRule}/${ruleId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error while updating rule data", err);
    throw err;
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axios.get(alerts.allNotifications, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
};
