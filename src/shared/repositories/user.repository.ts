import { Injectable } from '@nestjs/common';
import { FindOptions, Op, Transaction } from 'sequelize';
import { User } from '../models/user.model';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async deleteUser(userId: string, transaction: Transaction) {
    return await this.destroy({
      where: {
        id: userId,
      },
      transaction: transaction,
    });
  }

  async findAllUser(options: FindOptions): Promise<{
    rows: User[];
    count: number;
  }> {
    return await this.findAndCountAll(options);
  }

  async updateUserPassword(
    userId: string,
    newPassword: string,
    transaction: Transaction,
  ) {
    return await this.update(
      { password: newPassword },
      {
        where: {
          id: userId,
        },
        transaction: transaction,
      },
    );
  }

  async findUserById(userId: string) {
    return await this.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findLoginName(login: string) {
    return await this.findOne({
      where: {
        login: { [Op.like]: `${login}` },
      },
    });
  }

  async createUser(
    payload: { login: string; password: string },
    transaction: Transaction,
  ) {
    return await this.create(payload, { transaction });
  }
}
