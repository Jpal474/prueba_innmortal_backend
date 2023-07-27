/* eslint-disable prettier/prettier */
import { Departamentos } from './departamentos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-depatarmento.dto';
import { Supermercados } from 'src/supermercados/supermercados/supermercados.entity';

@Injectable()
export class DepartamentosService {
  private departamentos: Departamentos[] = [];
  
  constructor(
    @InjectRepository(Departamentos)
    private departamentosRepository: Repository<Departamentos>,
  ) {}

  async getDepartamentoById(id:string): Promise<Departamentos> {
    const found = await this.departamentosRepository.findOneBy({id:id});
    if (!found ) {
      throw new NotFoundException(
        `Departamento con el ID "${id}" no ha sido encontrado`,
      );
    }
    return found;
    
  }

  async getDepartamentoByName(nombre:string): Promise<Departamentos> {
    const found = await this.departamentosRepository.findOneBy({nombre:nombre});
    if (!found ) {
      throw new NotFoundException(
        `Departamento con el Nombre "${nombre}" no ha sido encontrado`,
      );
    }
    return found;
    
  }

  async getDepartamentosBySuperId(id:string): Promise<Departamentos[]> {
    const found = await this.departamentosRepository.find({
      relations: ['supermercado'],
      where: { supermercado:{id: id } },
    });
    if (!found ) {
      throw new NotFoundException(
        `Departamentos para el Supermercado "${id}" no han sido encontrados`,
      );
    }
    console.log(found);
    return found;
    
  }

async createDepartamento(createDepartamentoDto:CreateDepartamentoDto): Promise<Departamentos> {
  try{
    
  const departamento = this.departamentosRepository.create(createDepartamentoDto);
    await this.departamentosRepository.save(departamento);
    return departamento;
  }catch(error){
console.log(error)
  }
  }

async deleteDepartamento(id:string):Promise<void>{
  const result = await this.departamentosRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Departamento con el id: "${id}" no ha sido encontrado`);
  }
}


}