import { DataSource } from 'typeorm';

// import { UserEntity } from 'apps/users/src/users.entity';
// import {
//   CreatedEventEntity,
//   UpdatedEventEntity,
// } from 'apps/events/src/events.entity';
// import { UserIssuesEntity } from 'apps/issues/src/issues.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'postgres',
  password: 'postgres',
  database: 'app',
  entities: [
    'apps/events/events.entity.ts',
    'apps/issues/issues.entity.ts',
    'apps/users/users.entity.ts',
  ],
  migrations: ['apps/migrations/versions/*.ts'],
});

export default AppDataSource;
