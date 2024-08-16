import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FlightOperation } from './flightOperation.entity';
import { MaintenanceOperation } from './maintenanceOperation.entity';

export enum AirplaneStatus {
  AVAILABLE = 'AVAILABLE',
  MAINTENANCE = 'MAINTENANCE',
  STAND_BY = 'STAND_BY',
  IN_OPERATION = 'IN_OPERATION',
  RETIRED = 'RETIRED',
  LEASED_OUT = 'LEASED_OUT',
}

@Entity()
export class Aircraft {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 5, unique: true })
  tailId: string;

  @Column({ length: 20 })
  manufacturer: string;

  @Column({ length: 20 })
  model: string;

  @Column({ type: 'enum', enum: AirplaneStatus })
  status: AirplaneStatus;

  @Column({ length: 50 })
  currentConfigId: string;

  @OneToMany(
    () => MaintenanceOperation,
    (maintenanceOp) => maintenanceOp.aircraft,
  )
  maintenanceOperations: MaintenanceOperation[];

  @OneToMany(() => FlightOperation, (flightOp) => flightOp.aircraft)
  flightOperations: FlightOperation[];
}
