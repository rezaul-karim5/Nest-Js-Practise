import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User, UserRole } from './users.entity';
import { PermissionGuard, RolesGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionEnum } from 'src/permissions/permissions.enum';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Returns an array of users',
        type: [User],
    })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient role' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiResponse({
        status: 200,
        description: 'Returns a user',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        type: User,
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
    @Permissions(PermissionEnum.CreateUser)
    @UseGuards(PermissionGuard)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
}
