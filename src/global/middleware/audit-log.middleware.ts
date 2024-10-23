// src/common/middleware/audit-log.middleware.ts
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditService } from 'src/audit/audit.service';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuditLogMiddleware.name);
    constructor(private readonly auditService: AuditService) {}

    use(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'GET') {
            return next();
        }

        const originalSend = res.send.bind(res);

        res.send = (body: any): Response => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const bodyJson =
                    typeof body === 'string' ? JSON.parse(body) : body;

                const { sub: userId, role: userType = 'UNKNOWN' } =
                    req.body.user || {};

                this.auditService
                    .createAuditLog(
                        userId,
                        bodyJson,
                        req.originalUrl,
                        req.method,
                        userType,
                    )
                    .catch((error) => {
                        this.logger.error('Failed to create audit log:', error);
                    });
            }

            return originalSend(body);
        };

        next();
    }
}
