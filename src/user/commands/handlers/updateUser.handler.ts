import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserCommand } from '../impl';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: UpdateUserCommand) {
    const newUser = await this.prisma.user.update({
      where: {
        id: command.userId,
      },
      data: command.user,
    });
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: newUser,
    };
  }
}
