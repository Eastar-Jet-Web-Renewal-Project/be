import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FlightOperation } from './flightOperation.entity';

export enum DelayReason {
  WEATHER = 'WEATHER',
  TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
  OPERATIONAL = 'OPERATIONAL',
  SECURITY = 'SECURITY',
  AIRTRAFFIC_CONTROL = 'AIRTRAFFIC_CONTROL',
  CONNECTING = 'CONNECTING',
  PASSENGER = 'PASSENGER',
  OTHER = 'OTHER',
}

@Entity()
export class DelayLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FlightOperation, (flightOp) => flightOp.delayLogs)
  flightOperation: FlightOperation;

  @Column({ type: 'enum', enum: DelayReason })
  reason: DelayReason;

  @Column({ length: 255, nullable: true })
  comment: string;
}
