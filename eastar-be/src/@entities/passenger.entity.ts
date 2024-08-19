import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
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
@Unique(['bookingId', 'name', 'birth'])
export class Passenger {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Booking, (booking) => booking.passengers)
  @JoinColumn({ name: 'bookingId', referencedColumnName: 'id' })
  booking: Booking;

  @Column()
  price: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, nullable: true })
  email: string;

  @Column({ length: 25, nullable: true })
  phoneNumber: string;

  @Column({ length: 25, nullable: true })
  passportNumber: string;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;

  @Column({ type: 'date', nullable: true })
  birth: Date;

  @Column({ type: 'enum', enum: Nationality, nullable: true })
  nationality: Nationality;

  @Column({
    type: 'enum',
    enum: PassengerStatus,
    default: PassengerStatus.ON_BOOKING,
  })
  status: PassengerStatus;

  @Column({ nullable: true })
  relatedId: number;

  @Column({ length: 5, nullable: true })
  seat: string;
}
