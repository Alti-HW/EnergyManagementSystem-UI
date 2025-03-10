import { useUser } from "../context/user.context";

const FeatureAccessControl = ({ requiredRoles, children }: any) => {
  const { user } = useUser();
  // console.log(
  //   "requiredRoles",
  //   requiredRoles,
  //   user?.resource_access?.EMS?.roles
  // );
  const hasRequiredRole = requiredRoles?.some((role: string) =>
    user?.resource_access?.EMS?.roles?.includes(role)
  );

  if (!hasRequiredRole) {
    return null; // or you can return a fallback UI (e.g., a message or empty state)
  }

  return children;
};

export default FeatureAccessControl;
