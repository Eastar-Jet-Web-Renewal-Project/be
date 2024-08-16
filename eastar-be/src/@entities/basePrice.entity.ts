import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
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
@Unique(['flightId', 'bookingClass'])
export class BasePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flight, (flight) => flight.basePrices)
  @JoinColumn({ name: 'flightId', referencedColumnName: 'id' })
  flight: Flight;

  @Column({ type: 'enum', enum: BookingClass })
  bookingClass: BookingClass;

  @Column()
  basePrice: number;
}
