import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Deposits } from './deposit.entity';

@Injectable()
export class DepositsRepository extends Repository<Deposits> {
  constructor(private dataSource: DataSource) {
    super(Deposits, dataSource.createEntityManager());
  }

  async createTransaction(deposit: Deposits) {
    return this.save(deposit);
  }

  async getTransactions(walletId: string) {
    const deposits = await this.find({
      where: { walletId },
      order: { transactionDate: 'DESC' },
    });

    return deposits.map((deposit) => ({
      ...deposit,
      type: 'deposit',
    }));
  }
}
