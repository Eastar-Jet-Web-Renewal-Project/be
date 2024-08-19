import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //env
    ConfigModule.forRoot(),

    //crud
    AuthModule,
    UserModule,

    //db
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MAIN_DB_HOST,
      port: parseInt(process.env.MAIN_DB_PORT),
      username: process.env.MAIN_DB_USER_NAME,
      password: process.env.MAIN_DB_USER_PASSWORD,
      database: process.env.MAIN_DB_USER_DATABASE,
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
