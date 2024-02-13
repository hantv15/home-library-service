// Other dependencies
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Artist } from './artist.model';

@Table({
  tableName: 'album',
  timestamps: true,
})
export class Album extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  year: number;

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

  @BelongsTo(() => Artist, 'artistId')
  artist: Artist;
}
