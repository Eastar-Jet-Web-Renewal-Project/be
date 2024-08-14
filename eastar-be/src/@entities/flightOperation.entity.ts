import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Aircraft } from './aircraft.entity';
import { Booking } from './booking.entity';
import { DelayLog } from './delayLog.entity';
import { Flight } from './flight.entity';

export enum FlightOperationStatus {
  SCHEDULED = 'SCHEDULED',
  ON_BOARDING = 'ON_BOARDING',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
  ON_FLIGHT = 'ON_FLIGHT',
  ARRIVED = 'ARRIVED',
}

@Entity()
@Unique(['flight', 'departureTime'])
export class FlightOperation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.flightOperations)
  aircraft: Aircraft;

  @ManyToOne(() => Flight, (flight) => flight.flightOperations)
  flight: Flight;

  @Column({ type: 'enum', enum: FlightOperationStatus })
  status: FlightOperationStatus;

  @Column({ type: 'datetime' })
  departureTime: Date;

  @Column({ type: 'datetime' })
  arrivalTime: Date;

  @OneToMany(() => DelayLog, (delayLog) => delayLog.flightOperation)
  delayLogs: DelayLog[];

  @OneToMany(() => Booking, (booking) => booking.flightOperation)
  bookings: Booking[];
}
