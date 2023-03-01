import { HttpStatus } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'nestjs-prisma';
import { paginationFormat } from 'src/utils/helper';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private prisma: PrismaService) {}

  async execute(query: GetUsersQuery) {
    const page = query.page ? (query.page - 1) * query.pageSize : undefined;
    const users = await this.prisma.user.findMany({
      skip: page,
      take: query.pageSize,
    });
    const total = await this.prisma.user.count();
    const data = {
      result: users,
      total,
    };
    return paginationFormat(data, query.page, query.pageSize, HttpStatus.OK);
  }
}
