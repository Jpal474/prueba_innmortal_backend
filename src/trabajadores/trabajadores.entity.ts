/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class Trabajadores {
  @PrimaryColumn()
  id: string;
  @Column()
  nombre: string;

  @Column()
  apellidos:string;

  @Column()
  dias_laborales:string;

  @Column()
  telefono: string;

  @ManyToOne(()=> Departamentos, (departamento) => departamento.trabajador)
  departamento?:Departamentos
}
