import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
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
@Unique(['flightId', 'departureTime'])
export class FlightOperation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.flightOperations)
  @JoinColumn({ name: 'aircraftId', referencedColumnName: 'id' })
  aircraft: Aircraft;

  @ManyToOne(() => Flight, (flight) => flight.flightOperations)
  @JoinColumn({ name: 'flightId', referencedColumnName: 'id' })
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
