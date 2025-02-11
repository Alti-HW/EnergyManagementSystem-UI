import axios from "axios";
import { roles } from '../constants/apis'

const getAllRoles = async () => {
    try {
        const response = await axios.get(roles.allRoles, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response?.data || {};
    } catch (err) {
        console.error("Error fetching data", err);
        throw err
    }
};

const rolesActions = {
    getAllRoles
}

export default rolesActions