export const normalizeFiltersData = (data: any) => {
    const dataset = data.map(({
        buildingName,
        buildingId,
    }: {
        buildingName: string,
        buildingId: string,
    }) => ({
        buildingName,
        buildingId,
    }))
    return dataset
}