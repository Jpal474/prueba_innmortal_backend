/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class Trabajadores {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  apellidos:string;

  @Column()
  @ApiProperty()
  dias_laborales:string;

  @Column()
  @ApiProperty()
  telefono: string;

  @ManyToOne(()=> Departamentos, (departamento) => departamento.trabajador)
  @ApiProperty({ type: () => Departamentos})
  departamento?:Departamentos
}
