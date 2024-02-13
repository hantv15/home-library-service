import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { configService } from './shared/services/config.service';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRoot(configService.getSequelizeConfig()),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
