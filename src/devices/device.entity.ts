// import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

// @Entity('devices')
// export class Device {
//   @PrimaryColumn({ type: 'char', length: 21 })
//   id: string;

//   @Column({ type: 'varchar', length: 128, nullable: true })
//   name: string;

//   @Column({ type: 'char', length: 21, unique: true })
//   authToken: string;

//   @Column({ type: 'varchar', length: 256, nullable: true })
//   pushToken: string;

//   @CreateDateColumn({
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP(3)',
//   })
//   lastSeen: Date;

//   @Column({ type: 'varchar', length: 32 })
//   userId: string;
// }

import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('devices')
export class Device {
  @PrimaryColumn({ type: 'char', length: 21 })
  id: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  name: string; // device name

  @Column({ type: 'varchar', length: 128 })
  passwordHash: string; // store hashed password

  @Column({ type: 'varchar', length: 32, unique: true })
  userId: string; // Username (login)

  @Column({ type: 'varchar', length: 256, nullable: true })
  pushToken: string; // FCM push token

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  lastSeen: Date;
}
