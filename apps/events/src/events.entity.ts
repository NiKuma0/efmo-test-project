import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  triggeredAt?: Date;

  @Column()
  entityId: number;
}

@Entity()
export class CreatedEventEntity extends EventEntity {}

@Entity()
export class UpdatedEventEntity extends EventEntity {
  @Column({ array: true })
  changedColumns: string[];
}
