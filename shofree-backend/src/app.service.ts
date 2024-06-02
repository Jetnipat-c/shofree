import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async register() {
    return 'Register';
  }

  async login() {
    return 'Login';
  }

  async getUser() {
    return 'Get User';
  }

  async deposit() {
    return 'Deposit';
  }

  async withdraw() {
    return 'Withdraw';
  }

  async payment() {
    return 'Payment';
  }
}
