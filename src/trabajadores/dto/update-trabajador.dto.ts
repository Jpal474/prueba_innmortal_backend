/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { Departamentos } from 'src/departamentos/departamentos.entity';

export class UpdateTrabajadorDto {
   
  @IsString()
    id: string;

    @IsString()
    nombre: string;
  
    @IsString()
    apellidos: string;
  
    @IsString()
    dias_laborales: string;
  
    @IsString()
    telefono: string;

    @IsNotEmpty()
    departamento?:Departamentos
    
  }
  