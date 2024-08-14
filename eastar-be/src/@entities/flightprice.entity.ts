import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Flight } from './flight,entity';

export enum ClassType {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

@Entity('FlightPrice')
@Unique(['flight', 'classType'])
export class FlightPrice {
  @PrimaryGeneratedColumn()
  priceId: number;

  @Column({ length: 20 })
  flightId: string;

  @Column({ type: 'enum', enum: ClassType })
  classType: ClassType;

  @Column('int', { unsigned: true })
  basePrice: number;

  @Column('int', { unsigned: true })
  availableSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Flight, (flight) => flight.prices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'flightId' })
  flight: Flight;
}
