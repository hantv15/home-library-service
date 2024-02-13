// Nest dependencies
import { Injectable } from '@nestjs/common';

// Other dependencies
import {
  Attributes,
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  FindOrCreateOptions,
  QueryOptions,
  UpdateOptions,
} from 'sequelize';

import { Model, ModelCtor } from 'sequelize-typescript';
import { IBaseRepository } from './base.interface.repository';

@Injectable()
export abstract class BaseRepository<T extends Model>
  implements IBaseRepository<T>
{
  constructor(protected model: ModelCtor<T>) {}

  async query(
    sql: string,
    options?: QueryOptions,
  ): Promise<[unknown[], unknown] | undefined> {
    return await this.model.sequelize?.query(sql, options);
  }

  async count(
    options?: Omit<CountOptions<Attributes<T>>, 'group'>,
  ): Promise<number> {
    return await this.model.count(options);
  }

  public async bulkCreate(
    records: any,
    options?: BulkCreateOptions<Attributes<T>>,
  ): Promise<T[]> {
    return await this.model.bulkCreate(records, options);
  }

  async findOrCreate(
    options: FindOrCreateOptions<Attributes<T>, CreationAttributes<T>>,
  ): Promise<[T, boolean]> {
    return await this.model.findOrCreate(options);
  }

  async findOne(options?: FindOptions<Attributes<T>>): Promise<T | null> {
    return await this.model.findOne(options);
  }

  async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findByPk(id: any): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async findAndCountAll(
    options?: Omit<FindOptions<Attributes<T>>, 'where'>,
  ): Promise<{ rows: T[]; count: number }> {
    return await this.model.findAndCountAll(options);
  }

  async create(
    properties: any,
    options?: CreateOptions<any>,
  ): Promise<T | undefined> {
    return await this.model.create(properties, options);
  }

  async update(
    properties: any,
    options: UpdateOptions<Attributes<T>>,
  ): Promise<[affectedCount: number]> {
    return await this.model.update(properties, options);
  }

  async destroy(options?: DestroyOptions<Attributes<T>>): Promise<number> {
    return await this.model.destroy(options);
  }
}
