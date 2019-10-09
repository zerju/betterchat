import { User } from '../entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserRelationship {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(type => User, user => user.relationships, { onDelete: 'CASCADE' })
  relatingUserId?: User;

  @ManyToOne(type => User, user => user.relationships, { onDelete: 'CASCADE' })
  relatedUserId?: User;

  @CreateDateColumn()
  timestamp?: Date;

  @Column()
  type?: string;
}
