import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Wallets } from './wallet.entity';

@Injectable()
export class WalletsRepository extends Repository<Wallets> {
  constructor(private dataSource: DataSource) {
    super(Wallets, dataSource.createEntityManager());
  }

  async findOneById(
    walletId: string,
    options?: Omit<FindOneOptions<Wallets>, 'where'>,
  ) {
    return this.findOne({ where: { walletId }, ...options });
  }

  async createWallet(): Promise<Wallets> {
    const wallet = this.create();
    return await this.save(wallet);
  }

  async updateBalance(walletId: string, amount: number) {
    return this.update(walletId, { balance: amount });
  }
}
