/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/user.entity";

export class UpdateSupermercadoDto {
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    calle: string;
    @IsNotEmpty()
    estado: string; 
    @IsNotEmpty()
    colonia: string;
    @IsNotEmpty()
    ciudad: string;
    @IsNotEmpty()
    codigopostal: number;
    @IsNotEmpty()
    razonsocial: string;
    @IsNotEmpty()
    correo: string;
    @IsNotEmpty()
    numero:number;
    @IsOptional()
    encargado?:User
}

