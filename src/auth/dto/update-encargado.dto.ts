/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EncargadoGenero } from '../encargado-models/encargado-genero-enum';

export class UpdateEncargadoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @IsEnum(EncargadoGenero)
  genero: EncargadoGenero;

  @IsString()
  fecha_nacimiento: string;

  @IsString()
  correo: string;

  @IsString()
  telefono: string;

  @IsString()
  tipo:string;

  @IsOptional()
  contraseña: string;

  @IsOptional()
  confirmar_contraseña: string;
}