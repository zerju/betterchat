import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { userProviders } from './providers/user.providers';

@Module({
  providers: [...databaseProviders, ...userProviders],
  exports: [...databaseProviders, ...userProviders],
})
export class DatabaseModule {}
