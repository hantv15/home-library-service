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
  tableName: 'favorites',
  timestamps: true,
})
export class Favorites extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
  })
  artists: [];

  @Column({
    allowNull: true,
    type: DataType.JSON,
  })
  albums: [];

  @Column({
    allowNull: true,
    type: DataType.JSON,
  })
  tracks: [];

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
