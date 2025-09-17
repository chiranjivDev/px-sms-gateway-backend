// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Message } from '../messages/message.entity';

// @Entity('devices')
// export class Device {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string; // Example field, extend later with IMEI, etc.

//   @OneToMany(() => Message, (message) => message.device)
//   messages: Message[];
// }

import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('devices')
export class Device {
  @PrimaryColumn({ type: 'char', length: 21 })
  id: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  name?: string;

  @Column({ type: 'char', length: 21, unique: true })
  authToken: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  pushToken?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  lastSeen: Date;

  @Column({ type: 'varchar', length: 32 })
  userId: string;
}
