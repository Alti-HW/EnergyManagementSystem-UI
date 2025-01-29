import axios from "axios";
import { getAllBuildingsDataURL } from "../constants/apis";

export const getEnergyConsumptionData = async (payload: any) => {
    try {
        const response = await axios(getAllBuildingsDataURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: payload
        });
        return response.data
    } catch (err) {
        console.log('Error fetching data', err);
    } finally {
        console.log(false);
    }
}
