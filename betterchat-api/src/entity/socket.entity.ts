import { User } from '../entity/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Socket {
  @PrimaryColumn()
  id: string;
  @ManyToOne(type => User, user => user.relationships, { onDelete: 'CASCADE' })
  user?: User;
}
