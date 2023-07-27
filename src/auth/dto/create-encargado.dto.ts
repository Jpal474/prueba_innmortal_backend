/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { EncargadoGenero } from '../encargado-models/encargado-genero-enum';
export class CreateEncargadoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido_paterno: string;

  @IsNotEmpty()
  apellido_materno: string;

  @IsNotEmpty()
  genero: EncargadoGenero;

  @IsNotEmpty()
  fecha_nacimiento: string;

  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  tipo:string

  @IsNotEmpty()
  contraseña: string;
}
