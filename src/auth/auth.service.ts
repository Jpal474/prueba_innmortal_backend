import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateEncargadoDto } from './dto/create-encargado.dto';
import { UpdateEncargadoDto } from './dto/update-encargado.dto';
import { EncargadoGenero } from './encargado-models/encargado-genero-enum';
import * as sharp from 'sharp';
@Injectable()
export class AuthService {
  encargado: User = {
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    genero: EncargadoGenero.FEMENINO,
    fecha_nacimiento: '',
    correo: '',
    telefono: '',
    tipo: '',
    contraseña: '',
  };

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    console.log('entra login');
    const { correo, contraseña } = authCredentialsDto;
    console.log(correo);
    const user = await this.userRepository.findOneBy({ correo: correo });
    if (user && (await bcrypt.compare(contraseña, user.contraseña))) {
      const { id, tipo, verificado } = user;
      const payload: JwtPayload = { id, correo, tipo, verificado };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Correo o contraseña no válidos, revise sus credenciales',
      );
    }
  }
  async getEncargados(tipo: string): Promise<User[]> {
    const encargados = this.userRepository.find({
      relations: ['supermercado'],
      where: { tipo: tipo },
    });
    if ((await encargados).length === 0) {
      throw new NotFoundException(`No Hay Encargados Para Mostrar`);
    }

    return encargados;
  }

  async getEncargadoById(id: string): Promise<User> {
    //obtengo el encargado con el id del supermercado para después buscar el supermercado
    const found = await this.userRepository.find({
      relations: ['supermercado'],
      where: { id: id },
    });
    if (found.length === 0) {
      throw new NotFoundException(
        `Encargado con el ID "${id}" no ha sido encontrado`,
      );
    }
    return found[0];
  }

  async getEncargadoBySuperId(id: string): Promise<User> {
    const found = await this.userRepository.findOne({
      relations: ['supermercado'],
      where: { supermercado: { id: id } },
    });
    if (!found) {
      throw new NotFoundException(
        `Encargado para el Supermercado "${id}" no ha sido encontrado`,
      );
    }
    return found;
  }

  async createEncargado(createEncargadoDto: CreateEncargadoDto): Promise<User> {
    const en = createEncargadoDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(en.contraseña, salt);
    en.contraseña = hashedPassword;
    const encargado = this.userRepository.create(en);
    try {
      await this.userRepository.save(encargado);
      console.log(encargado);
      return encargado;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'El correo que ha escrito ya se encuentra en uso',
        );
      } else if (error.code === '23502') {
        throw new BadRequestException(
          'Error: Datos Invalidos Para El Encargado',
        );
      }
    }
  }

  async updateEncargado(
    id: string,
    updateEncargadoDto: UpdateEncargadoDto,
  ): Promise<User> {
    try {
      this.encargado = await this.getEncargadoById(id);
      this.encargado.nombre = updateEncargadoDto.nombre;
      this.encargado.apellido_paterno = updateEncargadoDto.apellido_paterno;
      this.encargado.apellido_materno = updateEncargadoDto.apellido_materno;
      this.encargado.correo = updateEncargadoDto.correo;
      this.encargado.fecha_nacimiento = updateEncargadoDto.fecha_nacimiento;
      this.encargado.genero = updateEncargadoDto.genero;
      this.encargado.telefono = updateEncargadoDto.telefono;
      this.encargado.tipo = 'encargado';
      if (updateEncargadoDto.contraseña.length !== 0) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(
          updateEncargadoDto.contraseña,
          salt,
        );
        this.encargado.contraseña = hashedPassword;
        console.log(`Hashed Pass ${hashedPassword}`);
      }
      await this.userRepository.save(this.encargado);
      return this.encargado;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'El correo que ha escrito ya se encuentra en uso',
        );
      }
    }
  }

  async verificarUsuario(
    id: string,
    codigoEnviado: string,
    codigoGenerado: string,
  ): Promise<boolean> {
    const usuario = await this.getEncargadoById(id);
    console.log(`Codigo Enviado ${codigoEnviado}`);
    console.log(`Codigo Generado ${codigoGenerado}`);
    if (codigoEnviado == codigoGenerado) {
      usuario.verificado = true;
      await this.userRepository.save(usuario);
      return true;
    } else {
      console.log('No coinciden !');
    }
  }

  async compressImage(
    inputBuffer: Buffer,
    outputQuality: number,
    id: string,
  ): Promise<User> {
    this.encargado = await this.getEncargadoById(id);
    try {
      const compressedImageBuffer = await sharp(inputBuffer)
        .jpeg({ quality: outputQuality }) // Adjust quality as needed
        .toBuffer();

      this.encargado.imagen = compressedImageBuffer.toString('base64');
      // const dataImagePrefix = `data:image/png;base64,`;
      // this.encargado.imagen = dataImagePrefix + this.encargado.imagen;
      console.log(this.encargado);
      await this.userRepository.save(this.encargado);
      return this.encargado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async convertFileToBuffer(file: Express.Multer.File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      file.stream
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', (error) => reject(error));
    });
  }
}
