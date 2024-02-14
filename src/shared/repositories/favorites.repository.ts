// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Favorites } from '../models/favorites.model';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class FavoritesRepository extends BaseRepository<Favorites> {
  constructor(private sequelize: Sequelize) {
    super(Favorites);
  }

  async findFavoriteAlbum(albumId: string) {
    return this.findOne({
      where: {
        [Op.and]: this.sequelize.fn(
          'JSON_CONTAINS',
          this.sequelize.col('albums'),
          `\"${albumId}\"`,
        ),
      },
    });
  }

  async findFavoriteArtist(artistId: string) {
    return this.findOne({
      where: {
        [Op.and]: this.sequelize.fn(
          'JSON_CONTAINS',
          this.sequelize.col('artists'),
          `\"${artistId}\"`,
        ),
      },
    });
  }

  async addArtistIdToFavorite(
    favId: string,
    artists: string[],
    transaction: Transaction,
  ) {
    return await this.update(
      {
        artists: artists,
      },
      {
        where: {
          id: favId,
        },
        transaction: transaction,
      },
    );
  }

  async addAlbumIdToFavorite(
    favId: string,
    albums: string[],
    transaction: Transaction,
  ) {
    return await this.update(
      {
        albums: albums,
      },
      {
        where: {
          id: favId,
        },
        transaction: transaction,
      },
    );
  }

  async updateFavoriteTrack(
    favId: string,
    trackIds: string[],
    transaction: Transaction,
  ) {
    return await this.update(
      {
        tracks: [...trackIds],
      },
      {
        where: {
          id: favId,
        },
        transaction: transaction,
      },
    );
  }

  async findFavoriteTrack(trackId: string) {
    return this.findOne({
      where: {
        [Op.and]: this.sequelize.fn(
          'JSON_CONTAINS',
          this.sequelize.col('tracks'),
          `\"${trackId}\"`,
        ),
      },
    });
  }

  async addTrackIdToFavorite(
    favId: string,
    tracks: string[],
    transaction: Transaction,
  ) {
    return await this.update(
      {
        tracks: tracks,
      },
      {
        where: {
          id: favId,
        },
        transaction: transaction,
      },
    );
  }

  async foundARecordFav() {
    return await this.findOne();
  }

  async declareOneRecordFav(transaction: Transaction) {
    return await this.create(
      {
        artists: [],
        albums: [],
        tracks: [],
      },
      {
        transaction: transaction,
      },
    );
  }
}
