import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../users.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password for the user',
    })
    @IsString()
    password: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.USER,
        description: 'The role of the user',
    })
    @IsEnum(UserRole)
    role: UserRole[];
}
