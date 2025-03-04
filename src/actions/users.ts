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
    const response = await axios.post(users.inviteUser, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return response?.data || {};
    } else {
      throw new Error("User Creation Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
    throw err
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
      throw new Error("User Updation Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
    throw err
  }
};

const getAvailableRolesForUser = async (id: string) => {
  try {
    const response = await axios.get(`${users.avaialbleRolesForUser}/${id}/available`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const getAssignedRolesForUser = async (id: string) => {
  try {
    const response = await axios.get(`${users.assignedRolesForUser}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data || {};
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const addRolesToUser = async (userData: any) => {
  try {
    const response = await axios.post(users.assignedRolesForUser, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return response?.data || {};
    } else {
      new Error(" Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

const removeRolesFromUser = async (userData: any) => {
  try {
    const response = await axios.delete(users.removeRolesFromUser, {
      data: userData,
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to remove roles from user");
    }
  } catch (err) {
    console.error("Error removing roles from user:", err);
    throw err;
  }
};

const deleteAUser = async (id: any) => {
  try {
    const response = await axios.delete(`${users.getAUser}/${id}`);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to remove roles from user");
    }
  } catch (err) {
    console.error("Error removing roles from user:", err);
    throw err;
  }
};

const userLogin = async (userData: any) => {
  try {
    const response = await axios.post(users.userLogin, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return response?.data || {};
    } else {
      new Error(" Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
    throw err
  }
};

const userLogout = async (refreshToken: string) => {
  try {
    const response = await axios.post(users.userLogout,
      {
        refreshToken
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (response) {
      return response?.data || {};
    } else {
      new Error(" Failed");
    }
  } catch (err) {
    console.error("Error fetching data", err);
    throw err
  }
};



export const userActions = {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  getAvailableRolesForUser,
  getAssignedRolesForUser,
  addRolesToUser,
  removeRolesFromUser,
  deleteAUser,
  userLogin,
  userLogout
};
