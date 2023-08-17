/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

export class CreateDepartamentoDto {
  @IsNotEmpty()
  @ApiProperty()
  nombre: string;

  @IsNotEmpty()
  @ApiProperty()
  supermercado:Supermercados;
}
