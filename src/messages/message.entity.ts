// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   // ManyToOne,
//   CreateDateColumn,
// } from 'typeorm';
// // import { Device } from '../devices/device.entity'; // FK (we’ll create Device entity soon)

// export enum MessageState {
//   Pending = 'Pending',
//   Processed = 'Processed',
//   Sent = 'Sent',
//   Delivered = 'Delivered',
//   Failed = 'Failed',
// }

// @Entity('messages')
// export class Message {
//   @PrimaryGeneratedColumn('uuid') // PK as string UUID
//   id: string;

//   @Column('text')
//   message: string;

//   @Column()
//   phoneNumber: string;

//   @Column({ type: 'boolean', default: false })
//   is_encrypted: boolean;

//   @Column({ type: 'int', nullable: true })
//   sim_number: number | null;

//   @Column({ type: 'int', nullable: true })
//   ttl: number | null;

//   @Column({ type: 'datetime', nullable: true })
//   valid_until: Date | null;

//   @Column({ type: 'boolean', default: false })
//   with_delivery_report: boolean;

//   @CreateDateColumn({ type: 'datetime' })
//   created_at: Date;

//   // @ManyToOne(() => Device, (device) => device.messages, { eager: false })
//   // device: Device;

//   @Column({
//     type: 'enum',
//     enum: MessageState,
//     default: MessageState.Pending,
//   })
//   state: MessageState;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MessageState {
  Pending = 'Pending',
  Sent = 'Sent',
  Delivered = 'Delivered',
  Failed = 'Failed',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string; // SMS text

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: MessageState,
    default: MessageState.Pending,
  })
  state: MessageState;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
