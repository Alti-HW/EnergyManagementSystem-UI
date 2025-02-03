const formatTime = (dateString: string): string => {
    const date = new Date(dateString);

    // Get hours, minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format minutes to always show two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const timeString = `${hours}:${formattedMinutes} ${period}`;

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed (January is 0, February is 1, etc.)
    const day = date.getDate();

    return `${day}/${month}/${year} ${timeString}`
}

export const normalizeBuildingsData = (data: any) => {
    const dataset = data.map(({
        buildingName,
        buildingId,
        totalEnergyConsumedKwh
    }: {
        buildingName: string,
        buildingId: string,
        totalEnergyConsumedKwh: string
    }) => ({
        buildingName,
        buildingId,
        totalEnergyConsumedKwh,
    }))

    return dataset
}


export const normalizeBuildingFloorwiseData = (data: any) => {
    const dataset = data?.floorConsumptions?.map(({
        floorNumber,
        energyConsumedKwh,
    }: {
        floorNumber: number,
        energyConsumedKwh: number,
    }) => ({
        floorNumber,
        energyConsumedKwh
    }))

    return dataset
}


export const normalizeBuildingDrilldownData = (data: any) => {

    const datasetNew: any = []
    console.log(data)
    data.floorConsumptions.forEach(({ floorNumber,
        floorDetails }: {
            floorNumber: number,
            floorDetails: any
        }) => {
        floorDetails.forEach(({ energyConsumedKwh, floorId, timestamp }: { energyConsumedKwh: string, floorId: number, timestamp: string }) => {
            datasetNew.push({
                Total_cost: (Number(energyConsumedKwh) * 23).toFixed(),
                units_consumed: energyConsumedKwh,
                cost_per_unit: 23,
                building: data.buildingName,
                floor: floorNumber,
                time_windlow: formatTime(timestamp),
            })
        })
    });
    console.log(datasetNew)
    return datasetNew

}