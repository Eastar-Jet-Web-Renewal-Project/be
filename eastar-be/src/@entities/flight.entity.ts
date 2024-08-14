import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { BasePrice } from './basePrice.entity';
import { FlightOperation } from './flightOperation.entity';

export enum FlightStatus {
  SEEKING_SLOTS = 'SEEKING_SLOTS',
  SCHEDULED = 'SCHEDULED',
  CHARTER_PENDING = 'CHARTER_PENDING',
  CHARTER_CONFIRMED = 'CHARTER_CONFIRMED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

@Entity()
@Unique(['airlineCode', 'flightNumber'])
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  airlineCode: string;

  @Column({ length: 10 })
  flightNumber: string;

  @Column({ type: 'enum', enum: FlightStatus })
  status: FlightStatus;

  @Column({ length: 10 })
  departAirportCode: string;

  @Column({ length: 10 })
  arrivalAirportCode: string;

  @Column({ type: 'time' })
  departureTime: string;

  @Column({ type: 'time' })
  arrivalTime: string;

  @Column({ length: 45 })
  dayOfOperation: string;

  @OneToMany(() => FlightOperation, (flightOp) => flightOp.flight)
  flightOperations: FlightOperation[];

  @OneToMany(() => BasePrice, (basePrice) => basePrice.flight)
  basePrices: BasePrice[];
}
