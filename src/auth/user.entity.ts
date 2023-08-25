/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EncargadoGenero } from './encargado-models/encargado-genero-enum';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';
import { IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class User {
 /* eslint-disable prettier/prettier */

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id?: string;

  @Column()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  apellido_paterno: string;

  @Column()
  @ApiProperty({nullable:true, default:''})
  apellido_materno?: string;

  @Column()
  @ApiProperty()
  genero: EncargadoGenero;

  @Column()
  @ApiProperty()
  fecha_nacimiento: string;

  @Column({unique:true})
  @IsEmail()
  @ApiProperty()
  correo: string;

  @Column()
  @ApiProperty()
  telefono: string;

  @Column()
  @ApiProperty()
  contraseña: string;

  @Column()
  @ApiProperty()
  tipo:string;

  @Column({default:false})
  @ApiProperty()
  verificado?:boolean;

  @Column({type: 'text', nullable: true})
  @ApiProperty()
  imagen?:string;

  @OneToOne(()=>Supermercados, (supermercado)=>supermercado.encargado)
  @JoinColumn()
  @ApiPropertyOptional({ type: () => Supermercados})
  supermercado?:Supermercados
}

