import axios from "axios";
import { users } from "../constants/apis";

interface UserPayload {
  Id?: string;
  Username?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  EmailVerified?: boolean;
  Enabled?: boolean;
  Created?: string;
}

const getUsers = async (payload: UserPayload = {}) => {
  try {
    const queryParams = new URLSearchParams(payload as any).toString();

    const response = await axios.get(`${users.allUsers}?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || [];
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const getUserDetails = async (id: string) => {
  try {
    const response = await axios.get(`${users.getAUser}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const createUser = async (userData: any) => {
  try {
    const response = await axios.post(users.getAUser, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return response?.data || {};
    } else {
      new Error("User Creation Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const updateUser = async (userData: any) => {
  try {
    const response = await axios.put(users.getAUser, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return response?.data || {};
    } else {
      new Error("User Updation Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const deleteUser = async (userData: any) => {
  try {
    const response = await axios.delete(users.getAUser, userData);
    if (response) {
      return response?.data || {};
    } else {
      new Error("User Updation Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

export const userActions = {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
};
