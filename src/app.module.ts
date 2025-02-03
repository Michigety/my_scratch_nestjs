import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/user.entity';
import { UsersModule } from './user/users.module';
import path from 'path';

require('dotenv').config();

console.log(process.env.AZURE_DB_SSL);


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: false,
      // 그 외 설정 및 기본값
      // retryAttempts: 10,
      // retryDelay: 3000,
      // autoLoadEntities: false,
      ssl: process.env.AZURE_DB_SSL
        ? {
            ca: process.env.AZURE_DB_SSL,
          }
        : false
    }),
    UsersModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
