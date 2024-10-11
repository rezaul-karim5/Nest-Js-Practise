import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  findOne(id: number): Promise<User | undefined>;
  findOneByName(name: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  createUser(createUserDto: CreateUserDto): Promise<User>;
}
