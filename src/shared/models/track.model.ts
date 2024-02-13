// Other dependencies
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

// Local files

@Table({
  tableName: 'track',
  timestamps: true,
})
export class Track extends Model {
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
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  artistId: string;

  @Column({
    allowNull: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  albumId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  duration: number;

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
