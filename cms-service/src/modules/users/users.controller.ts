import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { UserPayload } from 'src/shared/interfaces/user-payload';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const res = await this.usersService.register(registerDto);
    return res;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() userPayload: UserPayload) {
    return this.usersService.login(userPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUsers(@GetUser() userPayload: UserPayload) {
    return this.usersService.getUsers(userPayload);
  }
}
