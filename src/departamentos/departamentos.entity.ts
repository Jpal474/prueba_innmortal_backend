/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';
import { Trabajadores } from 'src/trabajadores/trabajadores.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamentos {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id?: string;

  @Column()
  @ApiProperty()
  nombre: string;

  @ManyToOne(()=>Supermercados,  (supermercado) => supermercado.departamento)
  @Exclude({toPlainOnly:true})
  @ApiProperty({ type: () => Supermercados})
  supermercado?:Supermercados

  @OneToMany(()=>Trabajadores, (trabajador)=> trabajador.departamento)
  @ApiProperty({ type: () => Trabajadores, isArray:true})
  trabajador?:Trabajadores[]
}
