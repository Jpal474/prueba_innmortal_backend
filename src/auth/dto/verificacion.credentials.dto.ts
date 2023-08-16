/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class VerificacionCredentialsDto {
  @IsNotEmpty()
  codigo: string;
}