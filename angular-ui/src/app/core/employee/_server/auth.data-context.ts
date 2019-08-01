import { EmployeeTable } from './users.table';
import { PermissionsTable } from './permissions.table';
import { RolesTable } from './roles.table';

// Wrapper class
export class EmployeeDataContext {
	public static employes: any = EmployeeTable.employes;
	public static roles: any = RolesTable.roles;
	public static permissions = PermissionsTable.permissions;
}
