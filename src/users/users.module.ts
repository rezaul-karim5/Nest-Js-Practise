import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from './user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
