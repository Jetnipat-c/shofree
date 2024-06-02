import { Injectable, Logger } from '@nestjs/common';
import { DepositsRepository } from 'src/models/deposits/deposit.repository';
import { PaymentsRepository } from 'src/models/payments/payment.repository';
import { WithdrawsRepository } from 'src/models/withdraws/withdraw.repository';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PaymentDto } from './dto/payment.dto';
import { UserPayload } from 'src/shared/interfaces/user-payload';
import { WalletsService } from '../wallets/wallets.service';
import { CustomError } from 'src/shared/errors/custom-error';
import { DepositStatus } from 'src/models/deposits/deposit.entity';
import { WithdrawStatus } from 'src/models/withdraws/withdraw.entity';
import { PaymentStatus } from 'src/models/payments/payment.entity';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    private readonly walletService: WalletsService,
    private readonly depositsRepository: DepositsRepository,
    private readonly withdrawsRepository: WithdrawsRepository,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async deposit(userPayload: UserPayload, depositDto: DepositDto) {
    this.logger.log('Deposit');
    const wallet = await this.walletService.getBalance(userPayload.walletId);

    if (!wallet) {
      throw new CustomError(400, 'Wallet not found');
    }

    const afterBalance = Number(wallet.balance) + Number(depositDto.amount);

    try {
      await this.walletService.updateBalance(wallet.walletId, afterBalance);

      const depositTx = this.depositsRepository.create({
        walletId: wallet.walletId,
        transactionDate: new Date(),
        status: DepositStatus.SUCCESS,
        beforeBalance: Number(wallet.balance),
        afterBalance,
        ...depositDto,
      });

      await this.depositsRepository.createTransaction(depositTx);

      return {
        beforeBalance: depositTx.beforeBalance,
        afterBalance: depositTx.afterBalance,
      };
    } catch (error) {
      this.logger.error(error);
      throw new CustomError(500, "Can't deposit");
    }
  }

  async withdraw(userPayload: UserPayload, withdrawDto: WithdrawDto) {
    this.logger.log('Withdraw');
    const wallet = await this.walletService.getBalance(userPayload.walletId);

    if (!wallet) {
      throw new CustomError(400, 'Wallet not found');
    }

    const afterBalance = Number(wallet.balance) - Number(withdrawDto.amount);

    if (afterBalance < 0) {
      throw new CustomError(400, 'Insufficient balance');
    }

    try {
      await this.walletService.updateBalance(wallet.walletId, afterBalance);

      const withdrawTx = this.withdrawsRepository.create({
        walletId: wallet.walletId,
        transactionDate: new Date(),
        status: WithdrawStatus.SUCCESS,
        beforeBalance: Number(wallet.balance),
        afterBalance,
        ...withdrawDto,
      });

      await this.withdrawsRepository.createTransaction(withdrawTx);

      return {
        beforeBalance: withdrawTx.beforeBalance,
        afterBalance: withdrawTx.afterBalance,
      };
    } catch (error) {
      this.logger.error(error);
      throw new CustomError(500, "Can't withdraw");
    }
  }

  async payment(userPayload: UserPayload, paymentDto: PaymentDto) {
    this.logger.log('Payment');
    const wallet = await this.walletService.getBalance(userPayload.walletId);

    if (!wallet) {
      throw new CustomError(400, 'Wallet not found');
    }

    if (Number(wallet.balance) < Number(paymentDto.amount)) {
      throw new CustomError(400, 'Insufficient balance');
    }

    const afterBalance = Number(wallet.balance) - Number(paymentDto.amount);

    try {
      await this.walletService.updateBalance(wallet.walletId, afterBalance);

      const paymentTx = this.paymentsRepository.create({
        walletId: wallet.walletId,
        transactionDate: new Date(),
        status: PaymentStatus.SUCCESS,
        beforeBalance: Number(wallet.balance),
        afterBalance,
        ...paymentDto,
      });

      await this.paymentsRepository.createTransaction(paymentTx);

      return {
        beforeBalance: paymentTx.beforeBalance,
        afterBalance: paymentTx.afterBalance,
      };
    } catch (error) {
      this.logger.error(error);
      throw new CustomError(500, "Can't payment");
    }
  }

  async getTransactions(walletId: string) {
    this.logger.log('Get transactions');
    const deposits = await this.depositsRepository.getTransactions(walletId);
    const withdraws = await this.withdrawsRepository.getTransactions(walletId);
    const payments = await this.paymentsRepository.getTransactions(walletId);
    const transactions = [...deposits, ...withdraws, ...payments].sort(
      (a, b) => a.transactionDate.getTime() - b.transactionDate.getTime(),
    );
    return transactions;
  }
}
