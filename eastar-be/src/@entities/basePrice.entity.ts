import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Flight } from './flight.entity';

export enum BookingClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

@Entity()
@Unique(['flight', 'bookingClass'])
export class BasePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flight, (flight) => flight.basePrices)
  flight: Flight;

  @Column({ type: 'enum', enum: BookingClass })
  bookingClass: BookingClass;

  @Column()
  basePrice: number;
}
