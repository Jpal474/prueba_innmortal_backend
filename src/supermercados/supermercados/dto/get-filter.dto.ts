/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
export class GetFilterDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  usuario?: User;
}