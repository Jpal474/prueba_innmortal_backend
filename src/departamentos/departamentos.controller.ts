import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { Departamentos } from './departamentos.entity';
import { CreateDepartamentoDto } from './dto/create-depatarmento.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('departamentos')
@ApiTags('Departamentos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class DepartamentosController {
  constructor(private departamentosService: DepartamentosService) {}

  @Get('departamento/:id')
  @ApiOperation({ summary: 'Obtener departamento a partir de su ID' })
  @ApiParam({ name: 'id', description: 'ID del Departamento' })
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

  @Get('search/:id')
  @ApiOperation({
    summary: 'Obtener lista de Departamentos a partir del ID del Supermercado',
  })
  @ApiParam({ name: 'id', description: 'ID del Supermercado' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa una lista de departamentos pertenecientes a un supermercado',
    isArray: true,
    type: Departamentos,
  })
  getDepartamentosBySuperId(@Param('id') id: string): Promise<Departamentos[]> {
    console.log('entra a controller');
    return this.departamentosService.getDepartamentosBySuperId(id);
  }

  @Get('/:nombre/:idsuper')
  @ApiOperation({ summary: 'Obtener departamento a partir de su nombre' })
  @ApiParam({ name: 'nombre', description: 'Nombre del Departamento' })
  @ApiParam({ name: 'idsuper', description: 'ID del Supermercado' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa un objeto con la información del departamento encontrado',
    isArray: false,
    type: Departamentos,
  })
  getDepartamento(
    @Param('nombre') nombre: string,
    @Param('idsuper') idsuper: string,
  ): Promise<Departamentos> {
    return this.departamentosService.getDepartamentoByName(nombre, idsuper);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Departamento' })
  @ApiBody({
    description: 'Datos del Departamento',
    type: CreateDepartamentoDto,
  })
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
  @ApiParam({ name: 'id', description: 'ID del Departamento' })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado exitosamente al departamento',
    isArray: false,
    type: Boolean,
  })
  deleteDepatarmentoById(@Param('id') id: string): Promise<boolean> {
    return this.departamentosService.deleteDepartamento(id);
  }
}
