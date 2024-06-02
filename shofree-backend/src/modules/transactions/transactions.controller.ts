import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetToken } from 'src/shared/decorators/token.decorator';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PaymentDto } from './dto/payment.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  async deposit(@GetToken() token: string, @Body() depositDto: DepositDto) {
    return this.transactionsService.deposit(token, depositDto);
  }

  @Post('withdraw')
  async withdraw(@GetToken() token: string, @Body() withdrawDto: WithdrawDto) {
    return this.transactionsService.withdraw(token, withdrawDto);
  }

  @Post('payment')
  async payment(@GetToken() token: string, @Body() paymentDto: PaymentDto) {
    return this.transactionsService.payment(token, paymentDto);
  }
}
