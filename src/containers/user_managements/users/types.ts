export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  enabled?: boolean;
  created?: string;
  roles?: string[];
}

export interface UserTableProps {
  users: User[];
  total: number;
  onSelect: (e: any, id: string) => void;
  onUserEdit: (index: number) => void;
  onUserDelete: (inded: number) => void;
  onSelectAll: (e: any) => void;
  selectAll: boolean;
  selectedUsers: string[];
  usersRolesList: any
}
