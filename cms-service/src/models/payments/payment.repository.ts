import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payments } from './payment.entity';

@Injectable()
export class PaymentsRepository extends Repository<Payments> {
  constructor(private dataSource: DataSource) {
    super(Payments, dataSource.createEntityManager());
  }

  async createTransaction(payment: Payments) {
    return this.save(payment);
  }

  async getTransactions(walletId: string) {
    const payments = await this.find({
      where: { walletId },
      order: { transactionDate: 'DESC' },
    });

    return payments.map((payment) => ({
      ...payment,
      type: 'payment',
    }));
  }
}
