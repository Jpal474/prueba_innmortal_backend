import { Controller, Body, Param, Get, Post, UseGuards } from '@nestjs/common';
import { SupermercadosService } from './supermercados.service';
import { Supermercados } from './supermercados.entity';
import { CreateSupermercadoDto } from './dto/createSupermercado.dto';
import { GetUser } from 'src/auth/get-usuario.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('supermercados')
@ApiTags('Supermercados')
@UseGuards(AuthGuard())
export class SupermercadosController {
  constructor(private supermercadosService: SupermercadosService) {}
  @Get()
  @ApiOperation({ summary: 'Listar Todos Los Supermercados' })
  @ApiResponse({
    status: 200,
    description: 'Obtengo una lista con todos los Supermercados registrados',
    isArray: true,
    type: Supermercados,
  })
  getSupermercados(): Promise<Supermercados[]> {
    return this.supermercadosService.getSupermercados();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obtener Supermercado por ID' })
  @ApiParam({ name: 'id', description: 'ID del Supermercado' })
  @ApiResponse({
    status: 200,
    description: 'Obtengo un objeto con los datos del Supermercado encontrado',
    isArray: false,
    type: Supermercados,
  })
  getSupermercado(@Param('id') id: string): Promise<Supermercados> {
    return this.supermercadosService.getSupermercado(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Supermercado' })
  @ApiBody({
    description: 'Datos del Supermercado',
    type: CreateSupermercadoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Obtengo un objeto con los datos del Supermercado creado',
    isArray: false,
    type: Supermercados,
  })
  createSupermercado(
    @Body() createSupermercadoDto: CreateSupermercadoDto,
    @GetUser() user: User,
  ): Promise<Supermercados> {
    console.log('Usuario');
    console.log(user);
    return this.supermercadosService.createSupermercado(
      createSupermercadoDto,
      user,
    );
  }
}
