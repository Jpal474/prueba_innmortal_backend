/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/user.entity";

export class UpdateSupermercadoDto {
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;

    @IsNotEmpty()
    @ApiProperty()
    calle: string;

    @IsNotEmpty()
    @ApiProperty()
    estado: string; 

    @IsNotEmpty()
    @ApiProperty()
    colonia: string;

    @IsNotEmpty()
    @ApiProperty()
    ciudad: string;

    @IsNotEmpty()
    @ApiProperty()
    codigopostal: number;

    @IsNotEmpty()
    @ApiProperty()
    razonsocial: string;

    @IsNotEmpty()
    correo: string;
    @ApiProperty()

    @IsNotEmpty()
    @ApiProperty()
    numero:number;
    
    @IsOptional()
    encargado?:User
}

