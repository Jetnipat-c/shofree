import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { PaymentDto } from './dto/payment.dto';
import configuration from 'src/configs/configuration';
import { lastValueFrom } from 'rxjs';
import { Response } from 'src/shared/interfaces/response.interface';
import { CustomError } from 'src/shared/errors/custom-error';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(private readonly httpService: HttpService) {}

  async deposit(token: string, depositDto: DepositDto) {
    this.logger.log('Depositing money...');
    try {
      const response = await lastValueFrom(
        this.httpService.post<
          Response<{
            beforeBalance: number;
            afterBalance: number;
          }>
        >(
          `${configuration().gateways.cmsServiceUrl}/api/transactions/deposit`,
          depositDto,
          {
            headers: {
              Authorization: token,
            },
          },
        ),
      );

      return response.data.data;
    } catch (error) {
      this.logger.error(error.response.data.message);
      throw new CustomError(
        error.response.data.statusCode,
        error.response.data.message,
      );
    }
  }

  async withdraw(token: string, withdrawDto: WithdrawDto) {
    this.logger.log('Withdrawing money...');
    try {
      const response = await lastValueFrom(
        this.httpService.post<
          Response<{
            beforeBalance: number;
            afterBalance: number;
          }>
        >(
          `${configuration().gateways.cmsServiceUrl}/api/transactions/withdraw`,
          withdrawDto,
          {
            headers: {
              Authorization: token,
            },
          },
        ),
      );

      return response.data.data;
    } catch (error) {
      this.logger.error(error.response.data.message);
      throw new CustomError(
        error.response.data.statusCode,
        error.response.data.message,
      );
    }
  }

  async payment(token: string, paymentDto: PaymentDto) {
    this.logger.log('Making payment...');
    try {
      const response = await lastValueFrom(
        this.httpService.post<
          Response<{
            beforeBalance: number;
            afterBalance: number;
          }>
        >(
          `${configuration().gateways.cmsServiceUrl}/api/transactions/payment`,
          paymentDto,
          {
            headers: {
              Authorization: token,
            },
          },
        ),
      );

      return response.data.data;
    } catch (error) {
      this.logger.error(error.response.data.message);
      throw new CustomError(
        error.response.data.statusCode,
        error.response.data.message,
      );
    }
  }
}
