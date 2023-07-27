import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadosModule } from './supermercados/supermercados/supermercados.module';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'prueba',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['**/src/entity/*{.ts,.js}'],
    }),
    SupermercadosModule,
    TrabajadoresModule,
    DepartamentosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
