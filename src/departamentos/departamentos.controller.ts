import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { Departamentos } from './departamentos.entity';
import { CreateDepartamentoDto } from './dto/create-depatarmento.dto';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('departamentos')
@ApiTags('Departamentos')
export class DepartamentosController {
  constructor(private departamentosService: DepartamentosService) {}

  @Get('departamento/:id')
  @ApiOperation({ summary: 'Obtener departamento a partir de su ID' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa un objeto con la información del departamento encontrado',
    isArray: false,
    type: Departamentos,
  })
  getDepartamentos(id: string): Promise<Departamentos> {
    return this.departamentosService.getDepartamentoById(id);
  }

  @Get('/:nombre')
  @ApiOperation({ summary: 'Obtener departamento a partir de su nombre' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa un objeto con la información del departamento encontrado',
    isArray: false,
    type: Departamentos,
  })
  getDepartamento(@Param('nombre') nombre: string): Promise<Departamentos> {
    return this.departamentosService.getDepartamentoByName(nombre);
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'Obtener lista de Departamentos a partir del ID del Supermercado',
  })
  @ApiResponse({
    status: 200,
    description:
      'Regresa una lista de departamentos pertenecientes a un supermercado',
    isArray: true,
    type: Departamentos,
  })
  getDepartamentosBySuperId(@Param('id') id: string): Promise<Departamentos[]> {
    return this.departamentosService.getDepartamentosBySuperId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Departamento' })
  @ApiResponse({
    status: 200,
    description: 'Regresa una objeto con los datos del departamento creado',
    isArray: false,
    type: Departamentos,
  })
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
  @ApiOperation({ summary: 'Borrar Departamento' })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado exitosamente al departamento',
    isArray: false,
    type: DeleteResult,
  })
  deleteTaskById(@Param('id') id: string): Promise<DeleteResult> {
    return this.departamentosService.deleteDepartamento(id);
  }
}
