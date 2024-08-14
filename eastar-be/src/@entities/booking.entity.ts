import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BookingClass } from './basePrice.entity';
import { FlightOperation } from './flightOperation.entity';
import { Passenger } from './passenger.entity';
import { User } from './user.entity';

export enum BookingStatus {
  ON_BOOKING = 'ON_BOOKING',
  RESERVED = 'RESERVED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  PARTIAL_CANCELELD = 'PARTIAL_CANCELELD',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ManyToOne(() => FlightOperation, (flightOp) => flightOp.bookings)
  flightOperation: FlightOperation;

  @Column({ type: 'enum', enum: BookingClass })
  bookingClass: BookingClass;

  @Column()
  pricing: number;

  @Column({ type: 'datetime' })
  bookingDate: Date;

  @Column({ type: 'enum', enum: BookingStatus })
  status: BookingStatus;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: true })
  bookingAgent: User;

  @Column({ length: 45 })
  bookingAgentName: string;

  @Column({ length: 45 })
  bookingAgentEmail: string;

  @Column({ length: 25 })
  bookingAgentPhoneNumber: string;

  @OneToMany(() => Passenger, (passenger) => passenger.booking)
  passengers: Passenger[];
}
