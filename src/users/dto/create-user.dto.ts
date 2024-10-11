// create-user.dto.ts

import { IsEnum, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { UserRole } from "../users.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserRole, { each: true }) // If role can be an array of UserRole
  role: UserRole[];
}
