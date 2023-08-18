/* eslint-disable prettier/prettier */
import { Departamentos } from './departamentos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-depatarmento.dto';

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
    try{
      const found = await this.departamentosRepository.find({
      relations: ['supermercado'],
      where: { supermercado:{id: id } },
    });
    if (!found ) {
      throw new NotFoundException(
        `Departamentos para el Supermercado "${id}" no han sido encontrados`,
      );
    }
    return found;
  }catch(error){
    console.log(error)
  }
    
  }

async createDepartamento(createDepartamentoDto:CreateDepartamentoDto): Promise<Departamentos> {
  try{
    
  const departamento = this.departamentosRepository.create(createDepartamentoDto);
    await this.departamentosRepository.save(departamento);
    return departamento;
  }catch(error){
    if (error.code === '23502') {
      throw new BadRequestException(
        'Error: Datos Invalidos Para El Departamento',
      );
    }
  }
  }

async deleteDepartamento(id:string):Promise<boolean>{
  const result = await this.departamentosRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Departamento con el id: "${id}" no ha sido encontrado`);
  }else{
  return true;
}
}


}
