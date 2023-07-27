import { Module } from '@nestjs/common';
import { Supermercados } from './supermercados.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadosController } from './supermercados.controller';
import { SupermercadosService } from './supermercados.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercados]), AuthModule],
  controllers: [SupermercadosController],
  providers: [SupermercadosService],
})
export class SupermercadosModule {}
