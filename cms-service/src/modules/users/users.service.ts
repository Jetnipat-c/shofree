import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/models/users/user.repository';
import { CustomError } from 'src/shared/errors/custom-error';
import { Users } from 'src/models/users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UserPayload } from 'src/shared/interfaces/user-payload';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private jwtService: JwtService,
    private walletsService: WalletsService,
    private transactionsService: TransactionsService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    this.logger.log('Registering user');
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { username: registerDto.username },
    });

    if (userAlreadyExists) {
      throw new CustomError(400, 'User already exists', registerDto);
    }

    const saltOrRounds = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(registerDto.password, saltOrRounds);

    try {
      return await this.usersRepository.manager.transaction(
        async (transaction) => {
          const wallet = await this.walletsService.createWallet();
          const user = this.usersRepository.create({
            username: registerDto.username,
            password: hashPassword,
            wallet,
          });
          await transaction.save(user);
          return user;
        },
      );
    } catch (error) {
      throw new CustomError(400, 'Error creating user', registerDto);
    }
  }

  async login(userPayload: UserPayload) {
    this.logger.log('Login user');
    const accessToken = this.jwtService.sign(userPayload);

    return {
      accessToken,
    };
  }

  async getUsers(userPayload: UserPayload) {
    this.logger.log('Get user');
    const users = await this.usersRepository.findOneByUserId(
      userPayload.userId,
      {
        relations: ['wallet'],
      },
    );

    if (!users) {
      throw new CustomError(400, 'User not found', userPayload);
    }

    const transactions = await this.transactionsService.getTransactions(
      users.wallet.walletId,
    );

    return {
      users,
      transactions,
    };
  }

  async validateUser(username: string, password: string): Promise<Users> {
    this.logger.log('Validate user');
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: {
        wallet: true,
      },
    });

    if (!user) {
      throw new CustomError(400, 'User not found', { username });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(400, 'Invalid password', { username });
    }

    return user;
  }
}
