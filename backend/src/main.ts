import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // CORS კონფიგურაცია
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];
  
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? allowedOrigins
      : true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  // უსაფრთხოების ჰედერები
  app.use((req, res, next) => {
    res.header('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    next();
  });

  // სტატიკური ფაილების მხარდაჭერა
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // ვალიდაციის pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // გლობალური API პრეფიქსი
  app.setGlobalPrefix('api');

  // Root endpoint for API info (before global prefix)
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (req, res) => {
    res.json({
      message: 'GRS Backend API',
      version: '1.0.0',
      status: 'running',
      documentation: '/api/test',
      endpoints: {
        test: '/api/test',
        categories: '/api/categories',
        courses: '/api/courses',
        exercises: '/api/exercises',
        sets: '/api/sets',
        articles: '/api/articles',
        users: '/api/users',
      }
    });
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📚 API documentation: http://localhost:${port}/api/test`);
}
bootstrap();
