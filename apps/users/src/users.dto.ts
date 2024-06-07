import { IsNotEmpty, ValidateIf, IsDefined } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  username: string;
}

export class UserUpdateRequest {
  fullname?: string;
  username?: string;

  @ValidateIf((o) => !o.fullname && !o.username)
  @IsDefined({ message: 'Non data has provided.' })
  protected readonly atLeastOne?: undefined;
}
