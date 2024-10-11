import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(userName: string, pass: string) {
        const user = await this.usersService.findOneByName(userName);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { name: user.name, sub: user.id, roles: user.role };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
