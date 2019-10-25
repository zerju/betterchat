import { Socket } from './socket.entity';
import { UserSession } from './user-session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRelationship } from './user-relationship.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 60, nullable: false })
  @Index({ unique: true })
  username?: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ default: false })
  isOnline?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @OneToMany(
    type => UserRelationship,
    userRelationship => userRelationship.relatingUserId,
    { cascade: true },
  )
  @JoinColumn()
  relationships?: UserRelationship[];

  @OneToMany(type => UserSession, userSession => userSession.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'sessions' })
  sessions?: UserSession[];

  @OneToMany(type => Socket, socket => socket.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'sockets' })
  sockets?: Socket[];
}
