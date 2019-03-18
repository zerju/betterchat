import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(type => User, user => user.sessions, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  jwt: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  deviceType?: string;

  @Column('bigint')
  lastActivity: number;
}
