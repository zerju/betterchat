import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRelationship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relatingUserId: string;

  @Column()
  relatedUserId: string;

  @Column()
  timestamp: Date;

  @Column()
  type: string;
}
