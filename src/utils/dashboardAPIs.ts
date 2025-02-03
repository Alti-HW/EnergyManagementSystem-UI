import axios from "axios";
import { getAllBuildingsDataURL } from "../constants/apis";

/// Needs to be removed once BE moves to cloud
const ENABLE_BE_CONNECT = process.env.REACT_APP_ENABLE_BE_CONNECT === 'true'
const url = ENABLE_BE_CONNECT ? getAllBuildingsDataURL : '\allBuildingsData.json'
const method = ENABLE_BE_CONNECT ? 'POST' : 'GET'

export const getEnergyConsumptionData = async (payload: any) => {
    try {
        const response = await axios(url, {
            method,
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
