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
import { MailerService } from 'src/mail/mailer/mailer.service';
import { MailCredentialsDto } from './dto/mail-credentials.dto';
import { VerificacionCredentialsDto } from './dto/verificacion.credentials.dto';
@Controller('auth')
export class AuthController {
  randomNumbers: string;
  constructor(
    private userService: AuthService,
    private mailerService: MailerService,
  ) {}

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

  @Post('send')
  async sendMail(
    @Body() mailCredentialsDto: MailCredentialsDto,
  ): Promise<string> {
    let numeros = '';
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10); // Genera números entre 0 y 9
      numeros += randomNumber;
    }
    this.randomNumbers = numeros;
    console.log(`numeros ${this.randomNumbers}`);
    try {
      const htmlContent = `
      <h1>Gracias Por Tu Registro</h1>
      <p>Tu código de verificación es el siguiente:</p>
      <h3>${this.randomNumbers}</h3>
    `;
      await this.mailerService.sendMail(
        mailCredentialsDto.destinatario,
        'Verificación',
        htmlContent,
      );
      return 'Correo enviado exitosamente';
    } catch (error) {
      return 'Error al enviar el correo';
    }
  }

  @Post('verificar/:id')
  verificarUsuario(
    @Param('id') id: string,
    @Body() verificacionCredentialsDto: VerificacionCredentialsDto,
  ): Promise<boolean> {
    console.log(id);
    console.log(verificacionCredentialsDto.codigo);
    console.log(this.randomNumbers);
    return this.userService.verificarUsuario(
      id,
      verificacionCredentialsDto.codigo,
      this.randomNumbers,
    );
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
