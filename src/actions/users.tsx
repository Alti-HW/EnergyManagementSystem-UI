import axios from "axios";
import { users } from "../constants/apis";
import Users from '../containers/users.json'; // Assume the user data is imported
import { resolve } from "path";

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
    // try {
    //     const queryParams = new URLSearchParams(payload as any).toString();

    //     const response = await axios.get(`${users.allUsers}?${queryParams}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });

    //     return response.data;
    // } catch (err) {
    //     console.error('Error fetching data', err);
    // } finally {
    //     console.log('Request completed');
    // }
    return new Promise((resolve)=>{
        resolve(Users)
    })

}

export const userActions = {
    getUsers
};
