import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Booking } from './booking.entity';

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Nationality {
  KR = 'KR',
  US = 'US',
  JP = 'JP',
  CN = 'CN',
}

export enum PassengerStatus {
  ON_BOOKING = 'ON_BOOKING',
  RESERVED = 'RESERVED',
  CONFIRMED = 'CONFIRMED',
  PASSPORT_FILLED = 'PASSPORT_FILLED',
  CANCELLED = 'CANCELLED',
  CHECK_IN = 'CHECK_IN',
  DONE = 'DONE',
}

@Entity()
@Unique(['booking', 'name', 'birth'])
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, (booking) => booking.passengers)
  booking: Booking;

  @Column()
  price: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, nullable: true })
  email: string;

  @Column({ length: 25 })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @Column({ type: 'date', nullable: true })
  birth: Date;

  @Column({ type: 'enum', enum: Nationality, nullable: true })
  nationality: Nationality;

  @Column({ type: 'enum', enum: PassengerStatus })
  status: PassengerStatus;

  @Column({ nullable: true })
  relatedId: number;

  @Column({ length: 5, nullable: true })
  seat: string;
}
