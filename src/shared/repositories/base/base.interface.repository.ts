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
import { Model } from 'sequelize-typescript';

export interface IBaseRepository<T extends Model> {
  query(
    sql: string,
    options?: QueryOptions,
  ): Promise<[unknown[], unknown] | undefined>;

  count(options?: Omit<CountOptions<Attributes<T>>, 'group'>): Promise<number>;

  bulkCreate(
    records: any,
    options?: BulkCreateOptions<Attributes<T>>,
  ): Promise<T[]>;

  findOrCreate(
    options: FindOrCreateOptions<Attributes<T>, CreationAttributes<T>>,
  ): Promise<[T, boolean]>;

  findOne(options?: FindOptions<Attributes<T>>): Promise<T | null>;

  findAll(options?: FindOptions<Attributes<T>>): Promise<T[]>;

  findByPk(id: any): Promise<T | null>;

  findAndCountAll(
    options?: Omit<FindOptions<Attributes<T>>, 'where'>,
  ): Promise<{ rows: T[]; count: number }>;

  create(
    properties: CreationAttributes<T>,
    options?: CreateOptions<any>,
  ): Promise<T | undefined>;

  update(
    properties: any,
    options: UpdateOptions<Attributes<T>>,
  ): Promise<[affectedCount: number]>;

  destroy(options?: DestroyOptions<Attributes<T>>): Promise<number>;
}
