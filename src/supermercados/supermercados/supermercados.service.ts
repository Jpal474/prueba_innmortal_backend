/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Supermercados } from './supermercados.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateDescription } from 'typeorm';
import { CreateSupermercadoDto } from './dto/createSupermercado.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SupermercadosService {
  private supermercados: Supermercados[] = [];
  supermercado:Supermercados={
   nombre:'',
   calle:'',
   numero:0,
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
    const query=this.supermercadosRepository.createQueryBuilder('supermercados');
    const supermercados = await query.getMany();
    return supermercados;
  }

  async getSupermercado(id:string):Promise<Supermercados>{
    const found = await this.supermercadosRepository.findOneBy({id:id})
    if(!found){
      throw new NotFoundException(`El Supermercado con el ID ${id} no ha sido encontrado`)
    }
    return found;
  
  }

  async createSupermercado(createSupermercadoDto: CreateSupermercadoDto, encargado:User): Promise<Supermercados> {
    console.log('encargado recibido')
    console.log(encargado)
    createSupermercadoDto.encargado=encargado
    console.log('encargado despues de insert')
    console.log(createSupermercadoDto.encargado)
    const supermercado = this.supermercadosRepository.create(createSupermercadoDto);
    console.log(supermercado.encargado);
    await this.supermercadosRepository.save(supermercado);
    return supermercado;
  }

  // async updateSupermercado(id:string,updateSupermercadoDto:UpdateSu): Promise<Supermercados>{
  //   this.supermercado = await this.getSupermercado(id);
  //   this.supermercado=updateSupermercadoDto;

  //   return this.supermercado
  // }

  async deleteSupermercado(id:string){
    const result = await this.supermercadosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Supermercado with "${id}" not found`);
    }
}


}



//   async getTaskById(id: string): Promise<Supermercados> {
//     const found = await this.supermercadosRepository.findOneBy({id:id});
//     if (!found) {
//       throw new NotFoundException(`Supermercado with ID "${id}" not found`);
//     }
//     return found;
//   }

//   async createSupermercado(
//     createSupermercadoDto: CreateSupermercadoDto,
//   ): Promise<Supermercados> {
//     const {
//       nombre,
//       calle,
//       numero,
//       colonia,
//       estado,
//       ciudad,
//       codigopostal,
//       razonsocial,
//       correo,
//     } = createSupermercadoDto;
//     const supermercado = this.supermercadosRepository.create({
//       nombre,
//       calle,
//       numero,
//       colonia,
//       estado,
//       ciudad,
//       codigopostal,
//       razonsocial,
//       correo,
//     });

//     await this.supermercadosRepository.save(supermercado);
//     return supermercado;
//   }

// //   updateSupermercado(){

// //   }

// async deleteSupermercado(id:string){
//     const result = await this.supermercadosRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Supermercado with "${id}" not found`);
//     }
// }


// }
