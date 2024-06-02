import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum WithdrawStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity('withdraws')
export class Withdraws {
  @PrimaryGeneratedColumn('uuid', { name: 'withdraw_id' })
  withdrawId: string;

  @Column({ name: 'wallet_id', type: 'uuid', nullable: false })
  walletId: string;

  @Column({
    name: 'transaction_date',
    type: 'timestamp',
    nullable: false,
  })
  transactionDate: Date;

  @Column({
    name: 'amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'before_balance',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  beforeBalance: number;

  @Column({
    name: 'after_balance',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  afterBalance: number;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: WithdrawStatus,
    default: WithdrawStatus.PENDING,
    nullable: false,
  })
  status: WithdrawStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
