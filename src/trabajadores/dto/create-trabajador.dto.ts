/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

export class CreateTrabajadorDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  dias_laborales: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  departamento?:Departamentos
}
