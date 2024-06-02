import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Withdraws } from './withdraw.entity';

@Injectable()
export class WithdrawsRepository extends Repository<Withdraws> {
  constructor(private dataSource: DataSource) {
    super(Withdraws, dataSource.createEntityManager());
  }

  async createTransaction(withdraw: Withdraws) {
    return this.save(withdraw);
  }

  async getTransactions(walletId: string) {
    const withdraws = await this.find({
      where: { walletId },
      order: { transactionDate: 'DESC' },
    });

    return withdraws.map((withdraw) => ({
      ...withdraw,
      type: 'withdraw',
    }));
  }
}
