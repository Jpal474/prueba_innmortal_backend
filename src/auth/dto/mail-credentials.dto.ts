/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class MailCredentialsDto {
  @IsNotEmpty()
  destinatario: string;
}
