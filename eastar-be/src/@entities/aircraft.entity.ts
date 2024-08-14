import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Flight } from './flight,entity';

@Entity('Aircraft')
export class Aircraft {
  @PrimaryColumn({ length: 20 })
  aircraftId: string;

  @Column({ length: 45 })
  model: string;

  @Column('int', { unsigned: true })
  totalSeatsEconomy: number;

  @Column('int', { unsigned: true })
  totalSeatsBuisness: number;

  @Column('int', { unsigned: true })
  totalSeatsFirst: number;

  @Column('int', { unsigned: true })
  maxTakeoffWeight: number;

  @Column('int', { unsigned: true })
  maxFuelCapacity: number;

  @Column('int', { unsigned: true })
  maxRange: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Flight, (flight) => flight.aircraft)
  flights: Flight[];
}
