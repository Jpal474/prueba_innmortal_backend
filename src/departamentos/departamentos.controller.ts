import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { Departamentos } from './departamentos.entity';
import { CreateDepartamentoDto } from './dto/create-depatarmento.dto';
import { DeleteResult } from 'typeorm';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private departamentosService: DepartamentosService) {}

  @Get('departamento/:id')
  getDepartamentos(id: string): Promise<Departamentos> {
    return this.departamentosService.getDepartamentoById(id);
  }

  @Get('/:nombre')
  getDepartamento(@Param('nombre') nombre: string): Promise<Departamentos> {
    return this.departamentosService.getDepartamentoByName(nombre);
  }

  @Get('search/:id')
  getDepartamentosBySuperId(@Param('id') id: string): Promise<Departamentos[]> {
    return this.departamentosService.getDepartamentosBySuperId(id);
  }

  @Post()
  createDepartamento(
    @Body() createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamentos> {
    try {
      return this.departamentosService.createDepartamento(
        createDepartamentoDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<DeleteResult> {
    return this.departamentosService.deleteDepartamento(id);
  }
}
