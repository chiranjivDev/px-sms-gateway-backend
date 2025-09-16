import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Example field, extend later with IMEI, etc.

  @OneToMany(() => Message, (message) => message.device)
  messages: Message[];
}
