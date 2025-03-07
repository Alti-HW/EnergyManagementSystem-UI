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
    let results = [];
    if (response?.data) {
      results = response?.data?.data?.map((alert: any) => {
        let obj: any = {};
        const [metric, expression, threshold] = alert?.expr?.split(" ");
        obj.alert = alert.alert;
        obj.description = alert?.annotations?.description;
        obj.expr = alert?.expr;
        obj.metric = metric;
        obj.expression = expression;
        obj.threshold = threshold;
        obj.duration = alert?.for;
        obj.severity = alert?.labels?.severity;
        return obj;
      });
    }

    return results;
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
    const response = await axios.delete(`${alerts.updateRule}/${ruleId}`, {
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

export const resolveNotification = async (id: string) => {
  try {
    const response = await axios.post(`${alerts.resolveNotification}/${id}`, {
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

export const deleteNotification = async (id: string) => {
  try {
    const response = await axios.delete(`${alerts.deleteNotification}/${id}`, {
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
