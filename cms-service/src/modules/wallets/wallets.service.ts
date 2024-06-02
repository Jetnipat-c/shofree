import { Injectable, Logger } from '@nestjs/common';
import { WalletsRepository } from 'src/models/wallets/wallet.repository';

@Injectable()
export class WalletsService {
  private readonly logger = new Logger(WalletsService.name);
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async createWallet() {
    this.logger.log('Create wallet');
    return await this.walletsRepository.createWallet();
  }

  async getBalance(walletId: string) {
    this.logger.log('Get balance');
    return await this.walletsRepository.findOneById(walletId);
  }

  async updateBalance(walletId: string, amount: number) {
    this.logger.log('Update balance');
    return await this.walletsRepository.updateBalance(walletId, amount);
  }
}
