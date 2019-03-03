import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { databaseTokens } from '../constants/tokens';

export const userProviders = [
  {
    provide: databaseTokens.userToken,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [databaseTokens.dbConnToken],
  },
];
