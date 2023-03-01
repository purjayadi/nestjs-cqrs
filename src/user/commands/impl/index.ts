import { CreateUserDto } from 'src/user/user.dto';

export class CreateUserCommand {
  constructor(public readonly user: CreateUserDto) {}
}

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly user: CreateUserDto,
  ) {}
}
