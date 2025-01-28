import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/user.entity';
import { UsersModule } from './user/users.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: true,
      // 그 외 설정 및 기본값
      // retryAttempts: 10,
      // retryDelay: 3000,
      // autoLoadEntities: false,
    }),
    UsersModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
