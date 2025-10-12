import { PermissionType, RoleType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permission";

export const roleGuard = (
  role: string,
  requiredPermissions: PermissionType[]
) => {
  const permissions = RolePermissions[role as RoleType];
  
  // If the role doesn't exist or lacks required permissions, throw an exception
  if (!permissions) {
    throw new UnauthorizedException(`Role ${role} not found`);
  }

  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );

  if (!hasPermission) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }
};
