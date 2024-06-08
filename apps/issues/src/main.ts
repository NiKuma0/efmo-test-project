import { NestFactory } from '@nestjs/core';
import { IssuesModule } from './issues.module';
import { IssuesService } from './issues.service';

async function bootstrap() {
  const app = await NestFactory.create(IssuesModule);

  const service = app.get(IssuesService);
  // TODO: This should be migration only for dev, not a service.
  await service.insertRandomUsers(1_000_000);

  await app.listen(3000);
}
bootstrap();
