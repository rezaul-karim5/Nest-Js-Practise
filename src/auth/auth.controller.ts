import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { LogInDto, ProfileDto } from './dto/login-dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LogInDto })
    @ApiResponse({
        status: 200,
        description: 'User successfully logged in',
        schema: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    signIn(@Body() signInDto: LogInDto) {
        return this.authService.signIn(signInDto.userName, signInDto.password);
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({
        status: 200,
        description: 'User profile retrieved successfully',
        type: ProfileDto,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getProfile(@Request() req): ProfileDto {
        return req.body.user;
    }
}
