import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FindByIdDTO } from 'src/dto/findById.dto';
import { CreateUserDto } from './user.dto';
import { GetUserByIdQuery, GetUsersQuery } from './queries/impl';
import { CreateUserCommand } from './commands/impl';

@Controller({ path: 'users', version: '1' })
@ApiTags('Users')
export default class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  async getUsers(@Query() { page, pageSize, search }: PaginationDTO) {
    return this.queryBus.execute(new GetUsersQuery(page, pageSize, search));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() payload: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(payload));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiProperty()
  async getUser(@Param() { id }: FindByIdDTO) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
