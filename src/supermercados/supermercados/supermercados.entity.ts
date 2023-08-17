/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departamentos } from 'src/departamentos/departamentos.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Supermercados {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id?: string;

  @Column()
  @IsString()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  calle: string;

  @Column()
  @ApiProperty()
  numero: number;

  @Column()
  @ApiProperty()
  colonia: string;

  @Column()
  @ApiProperty()
  estado: string;

  @Column()
  @ApiProperty()
  ciudad: string;

  @Column()
  @ApiProperty()
  razon_social: string;

  @Column()
  @ApiProperty()
  correo: string;

  @Column()
  @ApiProperty()
  codigo_postal: number;

  @Column()
  @ApiProperty()
  telefono: string;

  @OneToOne(() => User, (encargado) => encargado.supermercado) // specify inverse side as a second parameter
  @ApiProperty({ type: () => User})
  encargado?: User

  @OneToMany(() => Departamentos, (departamento) => departamento.supermercado) // specify inverse side as a second parameter
  @JoinColumn()
  @ApiProperty({ type: () => Departamentos, isArray:true})
  departamento?: Departamentos[]



}
