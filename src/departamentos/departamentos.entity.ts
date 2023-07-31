/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';
import { Trabajadores } from 'src/trabajadores/trabajadores.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamentos {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  nombre: string;

  @ManyToOne(()=>Supermercados,  (supermercado) => supermercado.departamento)
  @Exclude({toPlainOnly:true})
  supermercado?:Supermercados

  @OneToMany(()=>Trabajadores, (trabajador)=> trabajador.departamento)
  trabajador?:Trabajadores[]
}
