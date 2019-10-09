import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { envVariables } from './env-variables';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: envVariables.uploadsFolder,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
