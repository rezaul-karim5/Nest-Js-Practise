import { AuditMethodEnum } from "../audit.enum";

// create-audit.dto.ts
export class CreateAuditDto {
    userId: string;
    endpoint: string;
    state: string | null;
    method: AuditMethodEnum;
    rowId: number;
    objectName: string;
    userType: string;
    createdAt: Date;
    updatedAt: Date;
}
