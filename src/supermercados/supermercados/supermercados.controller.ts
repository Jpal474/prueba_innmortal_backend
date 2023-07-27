import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SupermercadosService } from './supermercados.service';
import { Supermercados } from './supermercados.entity';
import { CreateSupermercadoDto } from './dto/createSupermercado.dto';
import { GetUser } from 'src/auth/get-usuario.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetFilterDto } from './dto/get-filter.dto';

@Controller('supermercados')
@UseGuards(AuthGuard())
export class SupermercadosController {
  constructor(private supermercadosService: SupermercadosService) {}
  @Get()
  getSupermercados(): Promise<Supermercados[]> {
    return this.supermercadosService.getSupermercados();
  }

  @Get('/:id')
  getSupermercado(@Param('id') id: string): Promise<Supermercados> {
    return this.supermercadosService.getSupermercado(id);
  }

  @Post()
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

  //   @Patch('/:id/editar')
  //   updateSupermercado(
  //     @Param('id') id: string,
  //     @Body() updateEncargadoDto: CreateSupermercadoDto,
  //   ): Promise<Supermercados> {
  //     return this.supermercadosService.updateSupermercado(id, updateEncargadoDto);
  //   }
}
