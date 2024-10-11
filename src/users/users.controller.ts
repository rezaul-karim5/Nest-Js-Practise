import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './users.entity';
import { PermissionGuard, RolesGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionEnum } from 'src/permissions/permissions.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Permissions(PermissionEnum.CreateUser)
  @UseGuards(PermissionGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.createUser(createUserDto);
  }
}
