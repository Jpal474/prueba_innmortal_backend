/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

export class CreateDepartamentoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  supermercado:Supermercados;
}
