import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User',
}

@Entity({
    name: 'users',
})
export class User extends BaseEntity {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'John Doe',
        description: 'The full name of the user',
    })
    @Column()
    name: string;

    @ApiProperty({
        example: 'Password123',
        description: 'The password of the user',
    })
    @Column()
    password: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.USER,
        description: 'The role of the user',
    })
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole[];
}
