import { UsersTable } from './users.table';
import { PermissionsTable } from './permissions.table';
import { RolesTable } from './roles.table';

// Wrapper class
export class FunctionDataContext {
	public static function: any = UsersTable.function;
	public static roles: any = RolesTable.roles;
	public static permissions = PermissionsTable.permissions;
}
