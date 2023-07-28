import {
  ConflictException,
  Injectable,
  NotAcceptableException,
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

@Injectable()
export class AuthService {
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
      const { id, tipo } = user;
      const payload: JwtPayload = { id, correo, tipo };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async getEncargados(tipo: string): Promise<User[]> {
    const encargados = this.userRepository.find({
      relations: ['supermercado'],
      where: { tipo: tipo },
    });
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
      return encargado;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'El correo que ha escrito ya se encuentra en uso',
        );
      }
    }
  }

  async updateEncargado(
    id: string,
    updateEncargadoDto: UpdateEncargadoDto,
  ): Promise<User> {
    const encargado = await this.getEncargadoById(id);
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      genero,
      fecha_nacimiento,
      correo,
      telefono,
      contraseña,
      confirmar_contraseña,
    } = updateEncargadoDto;
    if (contraseña && confirmar_contraseña) {
      //verifica si hubo cambios en la contraseña
      if (contraseña === confirmar_contraseña) {
        //verifica si las contraseñas coincidan
        encargado.nombre = nombre; //actualiza los valores de los campos
        encargado.apellido_paterno = apellido_paterno;
        encargado.apellido_materno = apellido_materno;
        encargado.genero = genero;
        encargado.fecha_nacimiento = fecha_nacimiento;
        encargado.correo = correo;
        encargado.telefono = telefono;
        encargado.contraseña = contraseña;
      } else {
        throw new NotAcceptableException(`Las contraseñas no coinciden`); //regresa este error si las contraseñas no coinciden
      }
    } else {
      //si no mando contraseñas, entramos aqui
      const {
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        correo,
        telefono,
      } = updateEncargadoDto;
      encargado.nombre = nombre; //actualiza los valores de los campos
      encargado.apellido_paterno = apellido_paterno;
      encargado.apellido_materno = apellido_materno;
      encargado.genero = genero;
      encargado.fecha_nacimiento = fecha_nacimiento;
      encargado.correo = correo;
      encargado.telefono = telefono;
    }
    await this.userRepository.save(encargado);
    return encargado;
  }

  async deleteEncargadoById(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
  }
}
