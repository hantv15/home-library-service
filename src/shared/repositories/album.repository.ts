// Nest dependencies
import { Injectable } from '@nestjs/common';
import { FindOptions, Op, Transaction } from 'sequelize';
import { CreateAlbumDto } from '../../v1/album/dto/create-album.dto';
import { UpdateAlbumDto } from '../../v1/album/dto/update-album.dto';
import { Album } from '../models/album.model';
import { Artist } from '../models/artist.model';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class AlbumRepository extends BaseRepository<Album> {
  constructor() {
    super(Album);
  }

  async findAllInIds(albumIds: string[]) {
    return await this.findAll({
      where: {
        id: { [Op.in]: albumIds },
      },
      include: [
        {
          model: Artist,
        },
      ],
    });
  }

  async updateArtistIdOfAllNullAlbum(
    artistId: string,
    transaction: Transaction,
  ) {
    return await this.update(
      {
        artistId: null,
      },
      {
        where: {
          artistId: artistId,
        },
        transaction: transaction,
      },
    );
  }

  async updateAlbum(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
    transaction: Transaction,
  ) {
    return await this.update(
      {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      },
      {
        where: {
          id: albumId,
        },
        transaction: transaction,
      },
    );
  }

  async findAlbumNameDifferentId(albumId: string, nameAlbum: string) {
    return await this.findOne({
      where: {
        id: { [Op.ne]: albumId },
        name: { [Op.like]: `${nameAlbum}` },
      },
    });
  }

  async deleteAlbum(albumId: string, transaction: Transaction) {
    return await this.destroy({
      where: {
        id: albumId,
      },
      transaction: transaction,
    });
  }

  async findAllAlbum(options: FindOptions): Promise<{
    rows: Album[];
    count: number;
  }> {
    return await this.findAndCountAll(options);
  }

  async findAlbumOfArtist(albumId: string, artistId: string) {
    return await this.findOne({
      where: {
        id: albumId,
        artistId: artistId,
      },
      include: [
        {
          model: Artist,
        },
      ],
    });
  }

  async findAlbumById(albumId: string) {
    return await this.findOne({
      where: {
        id: albumId,
      },
      include: [
        {
          model: Artist,
        },
      ],
    });
  }

  async findAlbumName(nameAlbum: string) {
    return await this.findOne({
      where: {
        name: { [Op.like]: `${nameAlbum}` },
      },
    });
  }

  async createAlbum(createAlbumDto: CreateAlbumDto, transaction: Transaction) {
    return await this.create(createAlbumDto, { transaction });
  }
}
