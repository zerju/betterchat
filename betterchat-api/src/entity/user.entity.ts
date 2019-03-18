import { UserSession } from './user-session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  JoinColumn,
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

  @OneToMany(
    type => UserRelationship,
    userRelationship => userRelationship.relatedUserId,
    { cascade: true },
  )
  @JoinColumn()
  relationships?: UserRelationship;

  @OneToMany(type => UserSession, userSession => userSession.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  sessions?: UserSession[];
}
