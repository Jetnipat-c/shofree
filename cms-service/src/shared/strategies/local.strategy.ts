import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserPayload } from '../interfaces/user-payload';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserPayload> {
    const user = await this.usersService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      userId: user.userId,
      walletId: user.wallet.walletId,
      username: user.username,
    };
  }
}
