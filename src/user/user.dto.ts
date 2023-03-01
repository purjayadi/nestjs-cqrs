import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDto } from 'src/role/role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateRoleDto)
  userRole: CreateRoleDto[];
}
