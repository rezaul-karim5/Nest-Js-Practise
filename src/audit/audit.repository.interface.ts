import { Audit } from './audit.entity';
import { CreateAuditDto } from './dto/create-audit.dto';

export const AUDIT_REPOSITORY = 'AUDIT_REPOSITORY';

export interface IAuditRepository {
    bulkCreateAudit(audits: CreateAuditDto[]): Promise<Audit[]>;
}
