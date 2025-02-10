export const users = {
  allUsers: "http://localhost:5000/api/Users/Users",
  getAUser: "http://localhost:5000/api/Users",
  avaialbleRolesForUser: "http://localhost:5000/api/RollMapping/user",
  assignedRolesForUser: "http://localhost:5000/api/RollMapping/user",
  addRolesToUsers: "http://localhost:5000/api/RollMapping/user",
  removeRolesFromUser: "http://localhost:5000/api/RollMapping/user"
};

export const buildingsDataURL =
  "http://localhost:5000/api/Energy/energy-consumption";
export const buidlingsAndFloorsNamesURL =
  "http://localhost:5000/api/Building/GetAllBuildingsWithFloors";
export const buildingOccupancyURL =
  "http://localhost:5000/api/Energy/GetMetrics";

export const POST_REQ_HEADERS = {
  "Content-Type": "application/json",
};
