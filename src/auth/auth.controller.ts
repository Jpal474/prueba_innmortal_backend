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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@Controller('auth')
@ApiTags('Usuarios')
export class AuthController {
  randomNumbers: string;
  constructor(
    private userService: AuthService,
    private mailerService: MailerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de Usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Regresa una lista con todos los usuarios registrados',
    isArray: true,
    type: User,
  })
  getEncargados(): Promise<User[]> {
    return this.userService.getEncargados('encargado');
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Inicio de Sesión' })
  @ApiBody({
    description: 'Datos para autenticación del usuario',
    type: AuthCredentialsDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un token de autorización',
    isArray: false,
    type: String,
  })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @Post('send')
  @ApiOperation({ summary: 'Envio de correo con código de verificación' })
  @ApiBody({ description: 'Destinatario del Correo', type: MailCredentialsDto })
  @ApiResponse({
    status: 200,
    description: 'Regresa un mensaje de éxito si se ha enviado el email',
    isArray: false,
    type: String,
  })
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
  @ApiOperation({ summary: 'Verificar al usuario' })
  @ApiParam({ name: 'id', description: 'ID del Usuario' })
  @ApiBody({
    description: 'Código de Verificación Para el Usuario',
    type: VerificacionCredentialsDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa true si se ha podido verificar al usuario',
    isArray: false,
    type: Boolean,
  })
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
  @ApiOperation({ summary: 'Obtener Usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del usuario encontrado',
    isArray: false,
    type: User,
  })
  getEncargadoById(@Param('id') id: string): Promise<User> {
    return this.userService.getEncargadoById(id);
  }

  @Get('encargado/:id')
  @ApiOperation({ summary: 'Obtener Encargado por el ID del Supermercado' })
  @ApiParam({ name: 'id', description: 'ID del Supermercado' })
  @ApiResponse({
    status: 200,
    description:
      'Regresa un objeto con los datos del encargado encontrado a partir del ID del Supermercado',
    isArray: false,
    type: User,
  })
  getEncargadoBySuperId(@Param('id') id: string): Promise<User> {
    return this.userService.getEncargadoBySuperId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Encargado' })
  @ApiBody({ description: 'Datos del Encargado', type: CreateEncargadoDto })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del usuario creado',
    isArray: false,
    type: User,
  })
  createEncargado(
    @Body() createEncargadoDto: CreateEncargadoDto,
  ): Promise<User> {
    return this.userService.createEncargado(createEncargadoDto);
  }

  @Patch('/:id/editar')
  @ApiOperation({ summary: 'Actualizar Encargado' })
  @ApiParam({ name: 'id', description: 'ID del Encargado' })
  @ApiBody({
    description: 'Datos Actualizados del Encargado',
    type: UpdateEncargadoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con los datos del usuario actualizado',
    isArray: false,
    type: User,
  })
  updateEncargado(
    @Param('id') id: string,
    @Body() updateEncargadoDto: UpdateEncargadoDto,
  ): Promise<User> {
    return this.userService.updateEncargado(id, updateEncargadoDto);
  }

  @Post('upload/:id')
  @ApiOperation({ summary: 'Asignar foto de perfil a mi usuario' })
  @ApiParam({ name: 'id', description: 'ID del Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Regresa un objeto con la imagen asignada al usuario',
    isArray: false,
    type: User,
  })
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
