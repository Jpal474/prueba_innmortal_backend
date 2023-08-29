/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Supermercados } from './supermercados.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateSupermercadoDto } from './dto/createSupermercado.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SupermercadosService {
  private supermercados: Supermercados[] = [];
  supermercado:Supermercados={
   nombre:'',
   calle:'',
   numero:'',
   colonia:'',
   estado:'',
   ciudad:'',
   razon_social:'',
   correo:'',
   codigo_postal:0,
   telefono:'',
  }
  constructor(
    @InjectRepository(Supermercados)
    private supermercadosRepository: Repository<Supermercados>,
  ) {}

  async getSupermercados(): Promise<Supermercados[]> {
    try{
    const query= await this.supermercadosRepository.createQueryBuilder('supermercados');
    const supermercados = await query.getMany();
    if(!supermercados){
      throw new NotFoundException(`No Se Han Encontrado Supermercados`)
    }
    return supermercados;
  }
  catch(error){
       console.log(error)
  }
  }

  async getSupermercado(id:string):Promise<Supermercados>{
    try{
    const found = await this.supermercadosRepository.findOneBy({id:id})
    if(!found){
      throw new NotFoundException(`El Supermercado con el ID ${id} no ha sido encontrado`)
    }
    return found;
  }
  catch(error){
    console.log(error)
  }
  
  }

  async createSupermercado(createSupermercadoDto: CreateSupermercadoDto, encargado:User): Promise<Supermercados> {
    try{
    createSupermercadoDto.encargado=encargado
    const supermercado = this.supermercadosRepository.create(createSupermercadoDto);
    await this.supermercadosRepository.save(supermercado);
    return supermercado;
  }catch(error){
     if (error.code === '23502') {
      throw new BadRequestException(
        'Error: Datos Invalidos Para El Supermercado',
      );
    }
  }
  }

  async deleteSupermercado(id:string){
    const result = await this.supermercadosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Supermercado with "${id}" not found`);
    }
} 
}