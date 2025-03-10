// Base URL defined dynamically, can be set via environment variables or defaults
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"; // Default to localhost if not set
const baseURL2 = process.env.REACT_APP_API_BASE_URL || "http://localhost:5057";

// Users API Endpoints
export const users = {
  allUsers: `${baseURL}/api/Users/Users`,
  getAUser: `${baseURL}/api/Users`,
  avaialbleRolesForUser: `${baseURL}/api/RollMapping/user`,
  assignedRolesForUser: `${baseURL}/api/RollMapping/user`,
  addRolesToUsers: `${baseURL}/api/RollMapping/user`,
  removeRolesFromUser: `${baseURL}/api/RollMapping/user`,
  userLogin: `${baseURL}/api/auth/login`,
  userLogout: `${baseURL}/api/auth/logout`,
  inviteUser: `${baseURL}/api/users/invite`,
};

// Role API Endpoint
export const roles = {
  allRoles: `${baseURL}/api/roles/list`,
  createRoles: `${baseURL}/api/roles/create`,
  editRoles: `${baseURL}/api/roles/update-rolepermissions`,
  deleteRole: `${baseURL}/api/roles/delete`,
  getPermissions: `${baseURL}/api/permissions/list`,
};

// Building Data API Endpoints
export const buildingsDataURL = `${baseURL2}/api/Energy/energy-consumption`;
export const buidlingsAndFloorsNamesURL = `${baseURL2}/api/Building/GetAllBuildingsWithFloors`;
export const buildingOccupancyURL = `${baseURL2}/api/Energy/GetMetrics`;

export const alerts = {
  allRules: `${baseURL2}/api/alerts/rules`,
  createRule: `${baseURL2}/api/alerts/rules`,
  updateRule: `${baseURL2}/api/alerts/rules`,
  deleteRule: `${baseURL2}/api/alerts/delete_alert_rule`,
  allNotifications: `${baseURL2}/api/alerts/get_alerts`,
  resolveNotification: `${baseURL2}/api/alerts/resolve_alert`,
  deleteNotification: `${baseURL2}/api/alerts/delete_alert`,
};

// POST Request Headers
export const POST_REQ_HEADERS = {
  "Content-Type": "application/json",
};
