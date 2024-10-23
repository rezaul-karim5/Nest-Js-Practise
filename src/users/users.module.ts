import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from './user.repository.interface';
import { AuditLogMiddleware } from 'src/global/middleware/audit-log.middleware';
import { AuditModule } from 'src/audit/audit.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuditModule],
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
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuditLogMiddleware).forRoutes(UsersController);
    }
}
