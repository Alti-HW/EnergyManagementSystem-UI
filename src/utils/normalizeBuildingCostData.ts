export const normalizeBuildingCostData = (data: any) => {
    let totalcost = 0
    const dataset = data.map(({
        buildingName,
        buildingId,
        totalEnergyConsumedKwh
    }: {
        buildingName: string,
        buildingId: string,
        totalEnergyConsumedKwh: string
    }) => {
        totalcost =+ Number(totalEnergyConsumedKwh) * 23

        return ({
            label: buildingName,
            value: Number(totalEnergyConsumedKwh) * 23,
        })
    })

    return {dataset, totalcost}
}