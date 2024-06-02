import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class WithdrawDto {
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsOptional()
  note: string;
}
