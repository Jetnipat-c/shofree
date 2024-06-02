import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findOneByUserId(
    userId: string,
    options?: Omit<FindOneOptions<Users>, 'where'>,
  ): Promise<Users> {
    return this.findOne({ where: { userId }, ...options });
  }
}
