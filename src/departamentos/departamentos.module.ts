import { Module } from '@nestjs/common';
import { DepartamentosController } from './departamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamentos } from './departamentos.entity';
import { DepartamentosService } from './departamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departamentos])],
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
})
export class DepartamentosModule {}
