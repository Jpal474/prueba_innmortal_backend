import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TrabajadoresService } from './trabajadores.service';
import { Trabajadores } from './trabajadores.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('trabajadores')
@ApiTags('Trabajadores')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TrabajadoresController {
  constructor(private trabajadoresService: TrabajadoresService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Obtener Trabajadores a partir de un Departamento' })
  @ApiParam({ name: 'id', description: 'ID del Departamento' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa una lista de trabajadores pertenecientes a un Departamento',
    isArray: true,
    type: Trabajadores,
  })
  gettrabajadoresByDepartamento(
    @Param('id') id: string,
  ): Promise<Trabajadores[]> {
    return this.trabajadoresService.getTrabajadores(id);
  }

  @Get('trabajador/:id')
  @ApiOperation({ summary: 'Obtener Trabajador a partir de su ID' })
  @ApiParam({ name: 'id', description: 'ID del Trabajador' })
  @ApiResponse({
    status: 200,
    description: 'Se obtiene un objeto con los datos del trabajador encontrado',
    isArray: false,
    type: Trabajadores,
  })
  gettrabajadoresById(@Param('id') id: string): Promise<Trabajadores> {
    return this.trabajadoresService.getTrabajador(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Trabajador' })
  @ApiBody({ description: 'Datos del Trabajador', type: CreateTrabajadorDto })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del trabajador creado',
    isArray: false,
    type: Trabajadores,
  })
  createTrabajador(
    @Body() createTrabajadorDto: CreateTrabajadorDto,
  ): Promise<Trabajadores> {
    return this.trabajadoresService.createTrabajador(createTrabajadorDto);
  }

  @Patch('/:id/editar')
  @ApiOperation({ summary: 'Editar Trabajador' })
  @ApiParam({ name: 'id', description: 'ID del Trabajador' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del trabajador actualizado',
    isArray: false,
    type: Trabajadores,
  })
  updateTrabajador(
    @Param('id') id: string,
    @Body() updateTrabajadorDto: UpdateTrabajadorDto,
  ): Promise<Trabajadores> {
    return this.trabajadoresService.updateTrabajador(id, updateTrabajadorDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Borrar Trabajador' })
  @ApiParam({ name: 'id', description: 'ID del Trabajador' })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado exitosamente al trabajador',
    isArray: false,
    type: Boolean,
  })
  deleteTrabajador(@Param('id') id: string): Promise<boolean> {
    return this.trabajadoresService.deleteTrabajador(id);
  }
}
