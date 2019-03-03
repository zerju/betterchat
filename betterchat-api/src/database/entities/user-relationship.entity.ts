import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class UserRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  relatingUserId: number;

  @Column()
  relatedUserId: number;

  @Column()
  timestamp: Date;

  @Column()
  type: string;
}
