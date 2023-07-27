/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/user.entity";

export class CreateSupermercadoDto {
    @IsNotEmpty()
    nombre: string;
  
    @IsNotEmpty()
    calle: string;
  
    @IsNotEmpty()
    numero:number;
  
    @IsNotEmpty()
    colonia: string;
  
    @IsNotEmpty()
    estado: string;
  
    @IsNotEmpty()
    ciudad: string;
  
    @IsNotEmpty()
    razon_social: string;
  
    @IsNotEmpty()
    correo: string;
  
    @IsNotEmpty()
    codigo_postal: number;
  
    @IsNotEmpty()
    telefono: string;

    @IsOptional()
    encargado?:User
}

