/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Trabajadores } from './trabajadores.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Injectable()
export class TrabajadoresService {
  private supermercados: Trabajadores[] = [];
  trabajador: Trabajadores = {
    id: '',
    nombre: '',
    apellidos: '',
    dias_laborales: '',
    telefono: '',
  };
  constructor(
    @InjectRepository(Trabajadores)
    private trabajadoresRepository: Repository<Trabajadores>,
  ) {}

  async getTrabajadores(id): Promise<Trabajadores[]> {
    try {
      const found = await this.trabajadoresRepository.find({
        relations: ['departamento'],
        where: { departamento: { id: id } },
      });
      if (!found) {
        throw new NotFoundException(
          `Trabajadores para el Departamento "${id}" no han sido encontrados`,
        );
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTrabajador(id: string): Promise<Trabajadores> {
    try{
    const found = await this.trabajadoresRepository.findOne({
      relations: ['departamento'],
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(
        `Trabajadores con el "${id}" no han sido encontrados`,
      );
    }

    return found;
  }catch(error){
throw new Error(error)
  }
  }

  async createTrabajador(
    createTrabajadorDto: CreateTrabajadorDto,
  ): Promise<Trabajadores> {
    try {
      const trabajador =
        this.trabajadoresRepository.create(createTrabajadorDto);
      await this.trabajadoresRepository.save(trabajador);
      return trabajador;
    } catch (error) {
      if (error.code === '23502') {
        throw new BadRequestException(
          'Error: Datos Invalidos Para El Trabajador',
        );
      } else if (error.code === '23505') {
        throw new ConflictException(
          'El ID que ha escrito ya se encuentra en uso',
        );
      }
    }
  }

  async updateTrabajador(
    id: string,
    updateTrabajadorDto: UpdateTrabajadorDto,
  ): Promise<Trabajadores> {
    try {
      this.trabajador = await this.getTrabajador(id);
      this.trabajador = updateTrabajadorDto;
      await this.trabajadoresRepository.save(this.trabajador);
      return this.trabajador;
    } catch (error) {
      if (error.code === '23502') {
        throw new BadRequestException(
          'Error: Datos Invalidos Para El Trabajador',
        );
      }
    }
  }

  async deleteTrabajador(id: string): Promise<boolean> {
    const result = await this.trabajadoresRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trabajador with "${id}" not found`);
    } else {
      return true;
    }
  }
}
