import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  userId: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column()
  isAdmin: boolean;

  @Column({ type: 'date' })
  birth: Date;

  @Column({ length: 25, unique: true })
  phone: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.bookingAgent)
  bookings: Booking[];
}
