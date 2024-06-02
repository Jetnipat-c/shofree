import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import configuration from 'src/configs/configuration';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CustomError } from 'src/shared/errors/custom-error';
import { AxiosError } from 'axios';
import { Response } from 'src/shared/interfaces/response.interface';
import {
  GetUserResponse,
  LoginResponse,
  RegisterResponse,
} from 'src/shared/interfaces/auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly httpService: HttpService) {}

  async register(registerDto: RegisterDto) {
    this.logger.log('Registering user...');
    const response = await lastValueFrom(
      this.httpService
        .post<
          Response<RegisterResponse>
        >(`${configuration().gateways.cmsServiceUrl}/api/users/register`, registerDto)
        .pipe(
          catchError((error: AxiosError<CustomError>) => {
            throw new CustomError(
              error.response.data.statusCode,
              error.response.data.message,
              error.response.data.details,
            );
          }),
        ),
    );

    if (response.data.statusCode !== 201) {
      throw new CustomError(response.status, response.statusText);
    }

    return 'User registered successfully!';
  }

  async login(loginDto: LoginDto) {
    this.logger.log('Logging in user...');
    const response = await lastValueFrom(
      this.httpService
        .post<
          Response<LoginResponse>
        >(`${configuration().gateways.cmsServiceUrl}/api/users/login`, loginDto)
        .pipe(
          catchError((error: AxiosError<CustomError>) => {
            throw new CustomError(
              error.response.data.statusCode,
              error.response.data.message,
              error.response.data.details,
            );
          }),
        ),
    );

    if (response.data.statusCode !== 201) {
      throw new CustomError(response.status, response.statusText);
    }
    return { accessToken: response.data.data.accessToken };
  }

  async getUser(token: string) {
    this.logger.log('Getting user...');
    const response = await lastValueFrom(
      this.httpService
        .get<Response<GetUserResponse>>(
          `${configuration().gateways.cmsServiceUrl}/api/users`,
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError<CustomError>) => {
            throw new CustomError(
              error.response.data.statusCode,
              error.response.data.message,
              error.response.data.details,
            );
          }),
        ),
    );

    if (response.data.statusCode !== 200) {
      throw new CustomError(response.status, response.statusText);
    }
    return response.data.data;
  }
}
