import { HttpStatus, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'nestjs-prisma';
import { exclude } from 'src/utils/helper';
import { GetUserByIdQuery } from '../impl';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private prisma: PrismaService) {}

  async execute(query: GetUserByIdQuery) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: query.id,
      },
    });
    const userWithoutPassword = exclude(user, ['password']);
    if (!user) throw new NotFoundException('Data not found');
    return {
      success: true,
      statusCode: HttpStatus.OK,
      result: userWithoutPassword,
    };
  }
}
