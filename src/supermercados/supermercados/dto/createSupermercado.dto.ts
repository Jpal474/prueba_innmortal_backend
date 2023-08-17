/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/user.entity";

export class CreateSupermercadoDto {
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;
  
    @IsNotEmpty()
    @ApiProperty()
    calle: string;
  
    @IsNotEmpty()
    @ApiProperty()
    numero:number;
  
    @IsNotEmpty()
    @ApiProperty()
    colonia: string;
  
    @IsNotEmpty()
    @ApiProperty()
    estado: string;
  
    @IsNotEmpty()
    @ApiProperty()
    ciudad: string;
  
    @IsNotEmpty()
    @ApiProperty()
    razon_social: string;
  
    @IsNotEmpty()
    @ApiProperty()
    correo: string;
  
    @IsNotEmpty()
    @ApiProperty()
    codigo_postal: number;
  
    @IsNotEmpty()
    @ApiProperty()
    telefono: string;

    @IsOptional()
    encargado?:User
}

