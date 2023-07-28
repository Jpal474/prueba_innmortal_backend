/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajadores } from './trabajadores.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Injectable()
export class TrabajadoresService {
  private supermercados: Trabajadores[] = [];
  trabajador:Trabajadores={
    id: '',
    nombre: '',
    apellidos:'',
    dias_laborales:'',
    telefono: '',
  }
  constructor(
    @InjectRepository(Trabajadores)
    private trabajadoresRepository: Repository<Trabajadores>,
  ) {}

  async getTrabajadores(id): Promise<Trabajadores[]> {
    const found = await this.trabajadoresRepository.find({
      relations: ['departamento'],
      where: { departamento:{id: id } },
    });
    if (!found ) {
      throw new NotFoundException(
        `Trabajadores para el Departamento "${id}" no han sido encontrados`,
      );
    }

    return found;
  }

  async getTrabajador(id:string):Promise<Trabajadores>{
    const found = await this.trabajadoresRepository.findOne({
      relations: ['departamento'],
      where:{id: id } ,
    });
    if (!found ) {
      throw new NotFoundException(
        `Trabajadores para el Departamento "${id}" no han sido encontrados`,
      );
    }

    return found;
  }

  // async getTrabajadorBySupermercado(id:string):Promise<Trabajadores[]>{
  //   const found = await this.trabajadoresRepository.find({
  //     relations: ['departamento'],
  //     where: { supermercado:{id: id } },
  //   });
  //   if (!found ) {
  //     throw new NotFoundException(
  //       `Trabajadores para el Departamento "${id}" no han sido encontrados`,
  //     );
  //   }

  //   return found;
  // }

  async createTrabajador(createTrabajadorDto: CreateTrabajadorDto): Promise<Trabajadores> {
    const trabajador = this.trabajadoresRepository.create(createTrabajadorDto);
    await this.trabajadoresRepository.save(trabajador);
    return trabajador;
  }

  async updateTrabajador(id:string,updateTrabajadorDto:UpdateTrabajadorDto): Promise<Trabajadores>{
    this.trabajador = await this.getTrabajador(id);
    this.trabajador=updateTrabajadorDto;
    await this.trabajadoresRepository.save(this.trabajador);
    return this.trabajador
  }

  async deleteTrabajador(id:string){
    const result = await this.trabajadoresRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Supermercado with "${id}" not found`);
    }
}

 
}