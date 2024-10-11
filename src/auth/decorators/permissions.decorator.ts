import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from 'src/permissions/permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
