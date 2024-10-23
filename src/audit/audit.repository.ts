import { Audit } from './audit.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuditDto } from './dto/create-audit.dto';

@Injectable()
export class AuditRepository {
    constructor(
        @InjectRepository(Audit)
        private auditRepository: Repository<Audit>,
    ) {}

    async bulkCreateAudit(audits: CreateAuditDto[]): Promise<Audit[]> {
        const auditEntities = this.auditRepository.create(audits);
        return await this.auditRepository.save(auditEntities);
    }
}
