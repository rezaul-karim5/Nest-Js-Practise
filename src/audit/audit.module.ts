import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit.entity';
import { AUDIT_REPOSITORY } from './audit.repository.interface';
import { AuditRepository } from './audit.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Audit])],
    providers: [
        AuditService,
        {
            provide: AUDIT_REPOSITORY,
            useClass: AuditRepository,
        },
    ],
    exports: [AuditService],
})
export class AuditModule {}
