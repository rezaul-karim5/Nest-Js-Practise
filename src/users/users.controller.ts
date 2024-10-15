import {
    Body,
    Controller,
    Get,
    Param,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
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
    ApiConsumes,
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Post('upload')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'The file to upload',
                },
                name: {
                    type: 'string',
                    example: 'Testing',
                    description: 'The name of the file',
                },
            },
            required: ['file', 'name'],
        },
    })
    @ApiResponse({ status: 201, description: 'File successfully uploaded.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @UseInterceptors(FileInterceptor('file'))
    uploadFileAndPassValidation(
        @Body() uploadFile: UploadFileDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'text',
                })
                .addMaxSizeValidator({
                    maxSize: 20 * 1024 * 1024,
                })
                .build({ fileIsRequired: true }),
        )
        file: Express.Multer.File,
    ) {
        return this.usersService.saveFile(uploadFile, file);
    }
}
