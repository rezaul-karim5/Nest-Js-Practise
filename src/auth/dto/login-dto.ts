import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user',
    })
    @IsString()
    @IsNotEmpty()
    userName: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ProfileDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user',
    })
    id: number;

    @ApiProperty({
        example: 'John Doe',
        description: 'The full name of the user',
    })
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user',
    })
    email: string;

    @ApiProperty({
        example: ['user'],
        description: 'The roles assigned to the user',
    })
    roles: string[];
}
