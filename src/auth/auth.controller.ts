import {
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateEncargadoDto } from './dto/create-encargado.dto';
import { UpdateEncargadoDto } from './dto/update-encargado.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
    return this.userService.createEncargado(createEncargadoDto);
  }

  @Patch('/:id/editar')
  updateEncargado(
    @Param('id') id: string,
    @Body() updateEncargadoDto: UpdateEncargadoDto,
  ): Promise<User> {
    return this.userService.updateEncargado(id, updateEncargadoDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<User> {
    console.log(image);
    const compressedImageBuffer = await this.userService.compressImage(
      image.buffer,
      100,
      id,
    ); // Adjust quality as needed
    // Now you can save, send, or further process the compressed image buffer
    return compressedImageBuffer;
  }
}
