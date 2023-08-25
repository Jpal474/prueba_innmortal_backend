/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EncargadoGenero } from '../encargado-models/encargado-genero-enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEncargadoDto {
  @IsNotEmpty()
  @ApiProperty()
  nombre: string;

  @IsNotEmpty()
  @ApiProperty()
  apellido_paterno: string;

  @IsOptional()
  @ApiProperty()
  apellido_materno: string;

  @IsNotEmpty()
  @ApiProperty()
  genero: EncargadoGenero;

  @IsNotEmpty()
  @ApiProperty()
  fecha_nacimiento: string;

  @IsNotEmpty()
  @ApiProperty()
  correo: string;

  @IsNotEmpty()
  @ApiProperty()
  telefono: string;

  @IsNotEmpty()
  @ApiProperty()
  tipo:string

  @IsNotEmpty()
  @ApiProperty()
  contraseña: string;
}
