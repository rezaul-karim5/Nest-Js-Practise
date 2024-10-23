import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AuditMethodEnum } from './audit.enum';

@Entity('audit')
export class Audit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endpoint: string;

    @Column({
        nullable: false,
        name: 'object_name'
    })
    objectName: string;

    @Column({
        nullable: false,
        name: 'row_id'
    })
    rowId: number;

    @Column({
        type: 'enum',
        enum: AuditMethodEnum,
        nullable: false,
    })
    method: AuditMethodEnum;

    @Column({
        nullable: false,
        name: 'user_id'
    })
    userId: string;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    state: string;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'time with time zone',
        nullable: false,
        name: 'updated_at'
    })
    updatedAt: Date;
}
