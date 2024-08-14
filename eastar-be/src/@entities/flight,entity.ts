import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Aircraft } from './aircraft.entity';
import { FlightPrice } from './flightprice.entity';

export enum FlightStatus {
  SCHEDULED = 'Scheduled',
  DELAYED = 'Delayed',
  ARRIVED = 'Arrived',
  CANCELLED = 'Cancelled',
}

@Entity('Flight')
export class Flight {
  @PrimaryColumn({ length: 20 })
  flightId: string;

  @Column({ length: 20 })
  aircraftId: string;

  @Column({ length: 3, default: 'ZE' })
  airlineCode: string;

  @Column({ length: 10, nullable: true })
  flightNumber: string;

  @Column({ length: 5, nullable: true })
  departureAirport: string;

  @Column({ length: 5, nullable: true })
  arrivalAirport: string;

  @Column({ type: 'datetime', nullable: true })
  departureTime: Date;

  @Column({ type: 'datetime', nullable: true })
  arrivalTime: Date;

  @Column({ type: 'enum', enum: FlightStatus, nullable: true })
  status: FlightStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights)
  @JoinColumn({ name: 'aircraftId' })
  aircraft: Aircraft;

  @OneToMany(() => FlightPrice, (price) => price.flight)
  prices: FlightPrice[];
}
