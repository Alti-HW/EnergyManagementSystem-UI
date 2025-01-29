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
    const dataset = data.floorConsumptions.map(({
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