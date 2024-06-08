import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Gender, UserIssuesEntity } from './issues.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(UserIssuesEntity)
    private readonly userIssuesRepository: Repository<UserIssuesEntity>,
  ) {}

  async insertRandomUsers(count: number): Promise<void> {
    const length = await this.userIssuesRepository.count();
    count = count - length;
    if (count < 0) {
      return;
    }

    const users: object[] = [];
    for (let i = 0; i < count; i++) {
      users.push({
        age: (i % 50) + 18,
        firstName: 'First name',
        lastName: 'Last name',
        gender: i % 2 ? Gender.FEMALE : Gender.MALE,
        hasIssues: Boolean(i % 2),
      });
      process.stdout.write(
        `\rCreating objects: ${((i * 100) / count).toFixed(1)}%`,
      );
    }

    await this.userIssuesRepository
      .createQueryBuilder()
      .insert()
      .values(users)
      .execute();
  }

  async setToNoIssues(): Promise<number> {
    const result = await this.userIssuesRepository
      .createQueryBuilder()
      .update(UserIssuesEntity)
      .set({ hasIssues: false })
      .where('user.has_issues = :hasIssues', { hasIssues: true })
      .returning('count(user.id)')
      .execute();
    return 1;
  }
}
