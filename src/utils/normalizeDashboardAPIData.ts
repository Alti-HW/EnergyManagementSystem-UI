import dayjs from "dayjs";

export const normalizeAllBuildingsData = (data: any) => {
  const dataset = data?.map(
    ({
      buildingName,
      buildingId,
      totalEnergyConsumedKwh,
    }: {
      buildingName: string;
      buildingId: string;
      totalEnergyConsumedKwh: string;
    }) => ({
      buildingName,
      buildingId,
      totalEnergyConsumedKwh,
    })
  );

  return dataset ?? [];
};

export const normalizeBuildingDrilldownData = (data: any) => {
  const datasetNew: any = [];
  console.log(data);
  data?.floorConsumptions?.forEach(
    ({
      floorNumber,
      floorDetails,
    }: {
      floorNumber: number;
      floorDetails: any;
    }) => {
      floorDetails.forEach(
        ({
          energyConsumedKwh,
          floorId,
          timestamp,
        }: {
          energyConsumedKwh: string;
          floorId: number;
          timestamp: string;
        }) => {
          datasetNew.push({
            Total_cost: (Number(energyConsumedKwh) * 23).toFixed(),
            units_consumed: energyConsumedKwh,
            cost_per_unit: 23,
            building: data.buildingName,
            floor: floorNumber,
            time_windlow: dayjs(new Date(timestamp)).format(
              "YYYY-MM-DD hh:mm A"
            ),
          });
        }
      );
    }
  );
  console.log(datasetNew);
  return datasetNew;
};

export const normalizeBuildingCostData = (data: any) => {
  let totalcost = 0;
  const dataset = data?.map(
    ({
      buildingName,
      buildingId,
      totalEnergyConsumedKwh,
    }: {
      buildingName: string;
      buildingId: string;
      totalEnergyConsumedKwh: string;
    }) => {
      totalcost = +Number(totalEnergyConsumedKwh) * 23;
      return {
        label: buildingName,
        value: Number(totalEnergyConsumedKwh) * 23,
      };
    }
  );

  return { dataset, totalcost };
};

export const normalizeBuildingFloorwiseData = (
  data: any,
  isFloorwiseData: boolean
) => {
  let dataset = [];
  if (isFloorwiseData) {
    let floorDetails: any[] = data?.floorConsumptions?.[0]?.floorDetails?.sort(
      (a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    dataset = floorDetails?.map(
      ({
        energyConsumedKwh,
        timestamp,
      }: {
        energyConsumedKwh: number;
        timestamp: string;
      }) => ({
        x: dayjs(timestamp).format("DD/MM/YY hh:mm A"),
        y: energyConsumedKwh,
      })
    );
    return dataset ?? [];
  }
  dataset = data?.floorConsumptions?.map(
    ({
      floorNumber,
      energyConsumedKwh,
    }: {
      floorNumber: number;
      energyConsumedKwh: number;
    }) => ({
      x: floorNumber,
      y: energyConsumedKwh,
    })
  );

  return dataset ?? [];
};

export const normalizeBuildingOccupancy = (
  data: any,
  isFloorwiseData: boolean
) => {
  console.log(data);
  const dataset = data?.map(
    ({
      floorNumber,
      metricValue,
    }: {
      metricValue: number;
      floorNumber: number;
    }) => ({
      x: floorNumber,
      y: metricValue,
    })
  );

  return dataset ?? [];
};
