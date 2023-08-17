/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

export class CreateTrabajadorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dias_laborales: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  telefono: string;

  @IsNotEmpty()
  @ApiProperty()
  departamento?:Departamentos
}
