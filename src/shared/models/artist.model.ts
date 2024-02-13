// Other dependencies
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'artist',
  timestamps: true,
})
export class Artist extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  grammy: boolean;

  @CreatedAt
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: () => Date.now(),
  })
  createdAt: number;

  @UpdatedAt
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: () => Date.now(),
  })
  updatedAt: number;
}
