import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
export class UserIssuesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column()
  hasIssues: boolean;
}
