import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { UserPayload } from 'src/shared/interfaces/user-payload';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(
    @GetUser() userPayload: UserPayload,
    @Body() depositDto: DepositDto,
  ) {
    return this.transactionsService.deposit(userPayload, depositDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  async withdraw(
    @GetUser() userPayload: UserPayload,
    @Body() withdrawDto: WithdrawDto,
  ) {
    return this.transactionsService.withdraw(userPayload, withdrawDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('payment')
  async payment(
    @GetUser() userPayload: UserPayload,
    @Body() paymentDto: PaymentDto,
  ) {
    return this.transactionsService.payment(userPayload, paymentDto);
  }
}
