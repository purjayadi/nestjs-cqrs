import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    required: false,
    description: 'page number',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public readonly page: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly pageSize: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly search: string;
}
