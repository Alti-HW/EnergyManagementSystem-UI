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

const createRole = async (roleData: any) => {
    try {
        const updated: any = await axios.post(
            roles.editRoles,
            {
                name: roleData?.roleName,
                description: roleData?.roleDescription,
                composite: true,
                clientRole: true,
                compositeRoles: roleData.compositeRoles
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!updated?.data?.success) throw new Error("Role creation failed")
        return updated.data
    } catch (error) {
        throw error
    }
};

const updateRole = async (roleData: any) => {

    try {
        const updated: any = await axios.post(
            roles.editRoles,
            roleData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!updated?.data?.success) throw new Error("Role updation failed")
        return updated.data
    } catch (error) {
        throw error
    }
};

const deletRole = async (id: string) => {
    try {
        const updated: any = await axios.delete(
            `${roles.deleteRole}?roleId=${id}`
        );
        if (!updated?.data?.success) throw new Error("Role deletion failed")
        return updated.data
    } catch (error) {
        throw error
    }
};

const getAllPermissions = async () => {
    try {
        const response = await axios.get(roles.getPermissions, {
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
    getAllRoles,
    createRole,
    updateRole,
    deletRole,
    getAllPermissions
}

export default rolesActions