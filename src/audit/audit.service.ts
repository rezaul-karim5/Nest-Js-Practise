import { Inject, Injectable } from '@nestjs/common';
import { Audit } from './audit.entity';
import { CreateAuditDto } from './dto/create-audit.dto';
import {
    AUDIT_REPOSITORY,
    IAuditRepository,
} from './audit.repository.interface';
import { AuditMethodEnum } from './audit.enum';

@Injectable()
export class AuditService {
    constructor(
        @Inject(AUDIT_REPOSITORY)
        private auditRepository: IAuditRepository,
    ) {}

    async createAuditLog(
        userId: string,
        responseData: any,
        endpoint: string,
        requestMethod: string,
        userType: string,
    ): Promise<Audit[]> {
        const endpointSplitArray = endpoint.split('/');
        let audits: CreateAuditDto[] = [];

        // Process responseData and map it into audits
        if (Number.isInteger(responseData)) {
            const name = endpointSplitArray[endpointSplitArray.length - 2];
            const rowId = parseInt(
                endpointSplitArray[endpointSplitArray.length - 1],
            );

            audits = [
                {
                    userId,
                    endpoint,
                    state: null,
                    method: requestMethod.toUpperCase() as AuditMethodEnum,
                    rowId,
                    objectName: name,
                    userType,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
        }

        if (!Array.isArray(responseData)) {
            responseData = [responseData];
        }

        if (!audits.length) {
            audits = responseData.map((singleAudit: any) => {
                const rowId: number=singleAudit.id;

                const name = ['POST', 'DELETE', 'PUT'].includes(
                    requestMethod.toUpperCase(),
                )
                    ? endpointSplitArray[endpointSplitArray.length - 2]
                    : endpointSplitArray[endpointSplitArray.length - 1];

                return {
                    userId,
                    endpoint,
                    state: JSON.stringify(singleAudit),
                    method: requestMethod.toUpperCase(),
                    rowId,
                    objectName: name,
                    userType,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });
        }

        // Call bulk create in the repository
        return await this.auditRepository.bulkCreateAudit(audits);
    }
}
