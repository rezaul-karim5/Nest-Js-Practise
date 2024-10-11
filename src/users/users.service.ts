import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository, USER_REPOSITORY } from './user.repository.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {}

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    async findOneByName(name: string): Promise<User | undefined> {
        return this.userRepository.findOneByName(name);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }
}
