import { Controller, Post } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post('setNoIssues')
  setNoIssues(): Promise<number> {
    return this.issuesService.setToNoIssues();
  }
}
