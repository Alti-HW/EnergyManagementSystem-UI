export const rolesMockData = [
  {
    roleName: "Admin",
    description:
      "Full access to all system functionalities and user management.",
    permissions: ["Read", "Write", "Admin", "Manage Users", "View Reports"],
    dateAdded: "2023-01-01",
  },
  {
    roleName: "Floor Admin",
    description:
      "Can manage users and monitor activities for a specific floor.",
    permissions: ["Read", "Write", "Manage Users", "View Reports"],
    dateAdded: "2023-02-15",
  },
  {
    roleName: "User",
    description: "Standard user with limited access to system functionalities.",
    permissions: ["Read", "View Reports"],
    dateAdded: "2023-03-10",
  },
  {
    roleName: "Manager",
    description:
      "Manages a team of users and has permissions to monitor their activities.",
    permissions: [
      "Read",
      "Write",
      "Manage Users",
      "Assign Roles",
      "View Reports",
      "System Maintenance",
      "Assign Tasks",
      "Analyze Data",
    ],
    dateAdded: "2023-04-05",
  },
  {
    roleName: "HR",
    description:
      "Handles user management and related HR tasks, including role assignments.",
    permissions: [
      "Read",
      "Write",
      "Manage Users",
      "Assign Roles",
      "View Reports",
    ],
    dateAdded: "2023-05-20",
  },
  {
    roleName: "IT Support",
    description:
      "Assists users with technical issues and ensures system maintenance.",
    permissions: [
      "Read",
      "Write",
      "Manage Users",
      "View Reports",
      "System Maintenance",
    ],
    dateAdded: "2023-06-15",
  },
  {
    roleName: "Security",
    description: "Monitors security protocols and manages access permissions.",
    permissions: ["Read", "Manage Access", "Monitor Security", "View Reports"],
    dateAdded: "2023-07-01",
  },
  {
    roleName: "Sales",
    description:
      "Handles sales-related activities and has access to customer data.",
    permissions: ["Read", "Write", "Manage Sales", "View Reports"],
    dateAdded: "2023-08-10",
  },
  {
    roleName: "Marketing",
    description: "Responsible for marketing campaigns and data analysis.",
    permissions: [
      "Read",
      "Write",
      "Manage Campaigns",
      "View Reports",
      "Analyze Data",
    ],
    dateAdded: "2023-09-05",
  },
  {
    roleName: "Guest",
    description: "Temporary access with very limited functionalities.",
    permissions: ["Read"],
    dateAdded: "2023-10-01",
  },
];

export const permissionsMockData = [
  "Read",
  "Write",
  "Manage Users",
  "Assign Roles",
  "View Reports",
  "System Maintenance",
  "Assign Tasks",
  "Analyze Data",
];
