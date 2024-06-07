import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  triggeredAt?: Date;

  @Column()
  entityId: number;
}

@Entity()
export class UserCreatedEventEntity extends Event {}

@Entity()
export class UserUpdatedEventEntity extends Event {
  @Column({ array: true })
  changedColumns: string[];
}
