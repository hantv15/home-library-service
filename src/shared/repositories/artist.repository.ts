// Nest dependencies
import { Injectable } from '@nestjs/common';
import { FindOptions, Op, Transaction } from 'sequelize';
import { CreateArtistDto } from '../../v1/artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../../v1/artist/dto/update-artist.dto';
import { Artist } from '../models/artist.model';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class ArtistRepository extends BaseRepository<Artist> {
  constructor() {
    super(Artist);
  }

  async findAllInIds(artistIds: string[]) {
    return await this.findAll({
      where: {
        id: { [Op.in]: artistIds },
      },
    });
  }

  async updateArtist(
    userId: string,
    updateArtistDto: UpdateArtistDto,
    transaction: Transaction,
  ) {
    return await this.update(
      {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
      {
        where: {
          id: userId,
        },
        transaction: transaction,
      },
    );
  }

  async findArtistNameDifferentId(artistId: string, nameArtist: string) {
    return await this.findOne({
      where: {
        id: { [Op.ne]: artistId },
        name: { [Op.like]: `${nameArtist}` },
      },
    });
  }

  async deleteArtist(artistId: string, transaction: Transaction) {
    return await this.destroy({
      where: {
        id: artistId,
      },
      transaction: transaction,
    });
  }

  async findAllArtist(options: FindOptions): Promise<{
    rows: Artist[];
    count: number;
  }> {
    return await this.findAndCountAll(options);
  }

  async findArtistById(artistId: string) {
    return await this.findOne({
      where: {
        id: artistId,
      },
    });
  }

  async findArtistName(nameArtist: string) {
    return await this.findOne({
      where: {
        name: { [Op.like]: `${nameArtist}` },
      },
    });
  }

  async createArtist(
    createArtistDto: CreateArtistDto,
    transaction: Transaction,
  ) {
    return await this.create(createArtistDto, { transaction });
  }
}
