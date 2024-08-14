import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Unique(['firebaseUID'])
@Unique(['id'])
@Unique(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ type: 'varchar', length: 45 })
  id: string;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45 })
  firebaseUID: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isAdmin: boolean;

  @Column({ type: 'date' })
  birth: Date;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
