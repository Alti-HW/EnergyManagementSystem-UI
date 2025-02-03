export const normalizeBuildingOccupancy = (data: any) => {
    const dataset = data.map(({ floorNumber, metricValue }:
        { metricValue: number, floorNumber: number }) => ({
            floorNumber,
            metricValue,
        }))

    return dataset
}
