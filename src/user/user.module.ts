import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'nestjs-prisma';
import { CreateUserHandler } from './commands/handlers/createUser.handler';
import { UpdateUserHandler } from './commands/handlers/updateUser.handler';
import { GetUserByIdHandler } from './queries/handler/getUserById.handler';
import { GetUsersHandler } from './queries/handler/getUsers.handler';
import UsersController from './user.controller';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UsersController],
  providers: [
    GetUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
  ],
})
export class UsersModule {}
