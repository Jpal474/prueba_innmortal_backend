/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EncargadoGenero } from './encargado-models/encargado-genero-enum';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

@Entity()
export class User {
 /* eslint-disable prettier/prettier */

  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  nombre: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  genero: EncargadoGenero;

  @Column()
  fecha_nacimiento: string;

  @Column({unique:true})
  correo: string;

  @Column()
  telefono: string;

  @Column()
  contraseña: string;

  @Column()
  tipo:string;

  @Column({default:false})
  verificado?:boolean;

  @Column({type: 'text', nullable: true})
  imagen?:string;

  @OneToOne(()=>Supermercados, (supermercado)=>supermercado.encargado)
  @JoinColumn()
  supermercado?:Supermercados
}

