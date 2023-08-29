import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const CORS_OPTIONS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,POST,DELETE',
  allowedHeaders:
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Descripción de mi API')
    .setVersion('1.0')
    .addTag('endpoints') // Etiquetas para agrupar endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
