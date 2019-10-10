import { User } from '../entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(type => User, user => user.relationships, { onDelete: 'CASCADE' })
  sentFrom?: User;

  @ManyToOne(type => User, user => user.relationships, { onDelete: 'CASCADE' })
  sentTo?: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created?: Date;

  @Column('text')
  text: string;

  @Column({ default: false })
  wasEdited?: boolean;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  editedDate?: Date;
}
