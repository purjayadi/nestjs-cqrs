import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: CreateUserCommand) {
    const password = await bcrypt.hash(command.user.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...command.user, password },
    });
    delete newUser.password;
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: newUser,
    };
  }
}
