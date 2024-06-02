import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/configs/configuration';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { UsersRepository } from 'src/models/users/user.repository';
import { WalletsService } from '../wallets/wallets.service';
import { WalletsRepository } from 'src/models/wallets/wallet.repository';
import { TransactionsService } from '../transactions/transactions.service';
import { DepositsRepository } from 'src/models/deposits/deposit.repository';
import { WithdrawsRepository } from 'src/models/withdraws/withdraw.repository';
import { PaymentsRepository } from 'src/models/payments/payment.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: configuration().security.jwt.secret,
        signOptions: { expiresIn: configuration().security.jwt.expiresIn },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    WalletsService,
    TransactionsService,
    LocalStrategy,
    JwtStrategy,
    UsersRepository,
    WalletsRepository,
    DepositsRepository,
    WithdrawsRepository,
    PaymentsRepository,
  ],
})
export class UsersModule {}
