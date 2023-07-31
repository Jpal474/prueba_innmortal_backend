import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateEncargadoDto } from './dto/create-encargado.dto';
import { UpdateEncargadoDto } from './dto/update-encargado.dto';
import { DeleteResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get()
  getEncargados(): Promise<User[]> {
    return this.userService.getEncargados('encargado');
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @Get('/:id')
  getEncargadoById(@Param('id') id: string): Promise<User> {
    return this.userService.getEncargadoById(id);
  }

  @Get('encargado/:id')
  getEncargadoBySuperId(@Param('id') id: string): Promise<User> {
    return this.userService.getEncargadoBySuperId(id);
  }

  @Post()
  createEncargado(
    @Body() createEncargadoDto: CreateEncargadoDto,
  ): Promise<User> {
    console.log(`Encargado ${createEncargadoDto}`);
    return this.userService.createEncargado(createEncargadoDto);
  }

  @Patch('/:id/editar')
  updateEncargado(
    @Param('id') id: string,
    @Body() updateEncargadoDto: UpdateEncargadoDto,
  ): Promise<User> {
    return this.userService.updateEncargado(id, updateEncargadoDto);
  }
}
