// sms-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sms_logs')
export class SmsLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  toNumber: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  error: string;

  @CreateDateColumn()
  timestamp: Date;
}