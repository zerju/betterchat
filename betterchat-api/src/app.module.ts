import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './staregies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AuthService],
})
export class AppModule {}
