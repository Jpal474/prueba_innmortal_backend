import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrabajadoresService } from './trabajadores.service';
import { Trabajadores } from './trabajadores.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Controller('trabajadores')
export class TrabajadoresController {
  constructor(private trabajadoresService: TrabajadoresService) {}

  @Get('/:id')
  gettrabajadoresByDepartamento(
    @Param('id') id: string,
  ): Promise<Trabajadores[]> {
    return this.trabajadoresService.getTrabajadores(id);
  }

  @Get('trabajador/:id')
  gettrabajadoresById(@Param('id') id: string): Promise<Trabajadores> {
    return this.trabajadoresService.getTrabajador(id);
  }

  // @Get('supermercado/:id')
  // getSupermercado(@Param('id') id: string): Promise<Trabajadores[]> {
  //   return this.trabajadoresService.getTrabajadorBySupermercado(id);
  // }

  @Post()
  createSupermercado(
    @Body() createSupermercadoDto: CreateTrabajadorDto,
  ): Promise<Trabajadores> {
    return this.trabajadoresService.createTrabajador(createSupermercadoDto);
  }

  @Patch('/:id/editar')
  updateSupermercado(
    @Param('id') id: string,
    @Body() updateTrabajadorDto: UpdateTrabajadorDto,
  ): Promise<Trabajadores> {
    return this.trabajadoresService.updateTrabajador(id, updateTrabajadorDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.trabajadoresService.deleteTrabajador(id);
  }
}
