import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aircraft } from './aircraft.entity';

export enum MaintenanceType {
  TRANSIT = 'TRANSIT',
  PRE_POST_FLIGHT = 'PRE_POST_FLIGHT',
  WEEKLY = 'WEEKLY',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  SPECIAL = 'SPECIAL',
}

export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  ON_MAINTENANCE = 'ON_MAINTENANCE',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

@Entity()
export class MaintenanceOperation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.maintenanceOperations)
  aircraft: Aircraft;

  @Column({ type: 'enum', enum: MaintenanceType })
  type: MaintenanceType;

  @Column({ type: 'enum', enum: MaintenanceStatus })
  status: MaintenanceStatus;

  @Column({ type: 'datetime' })
  scheduledDate: Date;

  @Column({ type: 'datetime', nullable: true })
  doneDate: Date;
}
