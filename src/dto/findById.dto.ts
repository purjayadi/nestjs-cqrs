import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FindByIdDTO {
  @ApiProperty({
    required: true,
    description: 'Insert ID',
  })
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
