import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Users } from '../users/user.entity';

@Entity('wallets')
export class Wallets {
  @PrimaryGeneratedColumn('uuid', { name: 'wallet_id' })
  walletId: string;

  @Column({
    name: 'balance',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  balance: number;

  @OneToOne(() => Users, (user) => user.wallet, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
