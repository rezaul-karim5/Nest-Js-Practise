export enum PermissionEnum {
    CreateUser = 'create_user',
    ReadUser = 'read_user',
    UpdateUser = 'update_user',
    DeleteUser = 'delete_user',
}

export enum UserPermission {
    ReadUser = 'read_user',
}

export function convertEnumToArray(enumType: any): Array<string> {
    return Object.values(enumType);
}
