/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Exclude} from 'class-transformer'
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { Trabajadores } from 'src/trabajadores/trabajadores.entity';

@Entity()
export class Supermercados {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  nombre: string;

  @Column()
  calle: string;

  @Column()
  numero: number;

  @Column()
  colonia: string;

  @Column()
  estado: string;

  @Column()
  ciudad: string;

  @Column()
  razon_social: string;

  @Column()
  correo: string;

  @Column()
  codigo_postal: number;

  @Column()
  telefono: string;

  @OneToOne(() => User, (encargado) => encargado.supermercado) // specify inverse side as a second parameter
  @Exclude({toPlainOnly:true})
  encargado?: User

  @OneToMany(() => Departamentos, (departamento) => departamento.supermercado) // specify inverse side as a second parameter
  @JoinColumn()
  departamento?: Departamentos[]



}