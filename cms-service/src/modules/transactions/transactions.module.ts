import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DepositsRepository } from 'src/models/deposits/deposit.repository';
import { WithdrawsRepository } from 'src/models/withdraws/withdraw.repository';
import { PaymentsRepository } from 'src/models/payments/payment.repository';
import { WalletsService } from '../wallets/wallets.service';
import { WalletsRepository } from 'src/models/wallets/wallet.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    WalletsService,
    WalletsRepository,
    DepositsRepository,
    WithdrawsRepository,
    PaymentsRepository,
  ],
})
export class TransactionsModule {}
