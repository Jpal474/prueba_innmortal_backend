/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EncargadoGenero } from '../encargado-models/encargado-genero-enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEncargadoDto {
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsString()
  @ApiProperty()
  apellido_paterno: string;

  @IsString()
  @ApiProperty()
  apellido_materno: string;

  @IsEnum(EncargadoGenero)
  @ApiProperty()
  genero: EncargadoGenero;

  @IsString()
  @ApiProperty()
  fecha_nacimiento: string;

  @IsString()
  @ApiProperty()
  correo: string;

  @IsString()
  @ApiProperty()
  telefono: string;

  @IsString()
  @ApiProperty()
  tipo:string;

  @IsOptional()
  @ApiPropertyOptional()
  contraseña: string;

  @IsOptional()
  @ApiPropertyOptional()
  confirmar_contraseña: string;
}