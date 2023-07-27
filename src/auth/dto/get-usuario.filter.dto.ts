/* eslint-disable prettier/prettier */
import {IsOptional, IsString } from 'class-validator';
export class GetEncargadoFilterDto {
  @IsOptional()
  @IsString()
  id?: string;
}
