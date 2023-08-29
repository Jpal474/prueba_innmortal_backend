import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadosModule } from './supermercados/supermercados/supermercados.module';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { AuthModule } from './auth/auth.module';
import { MailerService } from './mail/mailer/mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    SupermercadosModule,
    TrabajadoresModule,
    DepartamentosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
