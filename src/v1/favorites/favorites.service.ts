// Nest dependencies
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

// Other dependencies
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Local files
import { Album } from '../../shared/models/album.model';
import { Artist } from '../../shared/models/artist.model';
import { Favorites } from '../../shared/models/favorites.model';
import { Track } from '../../shared/models/track.model';
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { FavoritesRepository } from '../../shared/repositories/favorites.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { common } from '../../shared/utilities/common';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private sequelize: Sequelize,
  ) {}

  async deleteFavoriteTrackWhenTrackDelete(
    trackId: string,
    transaction: Transaction,
  ) {
    let favorite: Favorites = null;

    try {
      favorite = await this.favoritesRepository.foundARecordFav();

      if (!favorite) {
        favorite = await this.declareOneRecordFav(transaction);
      }

      const indexTrackId = common.findIndexElementFromArray(
        favorite.tracks,
        trackId,
      );

      const newTrackIds = common.removeElementFromArrayAtIndex(
        favorite.tracks,
        indexTrackId,
      );

      await this.favoritesRepository.addTrackIdToFavorite(
        favorite.id,
        newTrackIds,
        transaction,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return favorite;
  }

  async deleteFavoriteAlbumWhenAlbumDelete(
    albumId: string,
    transaction: Transaction,
  ) {
    let favorite: Favorites = null;

    try {
      favorite = await this.favoritesRepository.foundARecordFav();

      if (!favorite) {
        favorite = await this.declareOneRecordFav(transaction);
      }

      const indexAlbumId = common.findIndexElementFromArray(
        favorite.albums,
        albumId,
      );

      const newAlbumIds = common.removeElementFromArrayAtIndex(
        favorite.albums,
        indexAlbumId,
      );

      await this.favoritesRepository.addAlbumIdToFavorite(
        favorite.id,
        newAlbumIds,
        transaction,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return favorite;
  }

  async deleteFavoriteArtistWhenArtistDelete(
    artistId: string,
    transaction: Transaction,
  ) {
    let favorite: Favorites = null;

    try {
      favorite = await this.favoritesRepository.foundARecordFav();

      if (!favorite) {
        favorite = await this.declareOneRecordFav(transaction);
      }

      const indexArtistId = common.findIndexElementFromArray(
        favorite.artists,
        artistId,
      );

      const newArtistIds = common.removeElementFromArrayAtIndex(
        favorite.artists,
        indexArtistId,
      );

      await this.favoritesRepository.addAlbumIdToFavorite(
        favorite.id,
        newArtistIds,
        transaction,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return favorite;
  }

  async declareOneRecordFav(transaction: Transaction) {
    let favorite: Favorites = null;

    try {
      favorite =
        await this.favoritesRepository.declareOneRecordFav(transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return favorite;
  }

  async createTrack(id: string) {
    let track: Track = null;
    let favorite: Favorites = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      track = await this.trackRepository.findTrackById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!track) {
      throw new UnprocessableEntityException();
    }

    try {
      favorite = await this.favoritesRepository.foundARecordFav();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    try {
      const addTrackId: string[] = [...favorite.tracks, id];
      await this.sequelize.transaction(async (transaction: Transaction) => {
        if (!favorite) {
          favorite = await this.declareOneRecordFav(transaction);
        }

        await this.favoritesRepository.addTrackIdToFavorite(
          favorite.id,
          addTrackId,
          transaction,
        );
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return new Response({
      data: favorite,
      serviceId: FavoritesService.name,
      functionId: this.createTrack.name,
    });
  }

  async removeTrack(trackId: string, transaction: Transaction) {
    let track: Track = null;
    let favorite: Favorites = null;
    const isTrackUuid = configService.verifyUuid(trackId);

    favorite = await this.favoritesRepository.findFavoriteTrack(trackId);

    if (!favorite) {
      throw new NotFoundException();
    }

    if (!isTrackUuid) {
      throw new BadRequestException();
    }

    try {
      track = await this.trackRepository.findTrackById(trackId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    const indexTrackId = common.findIndexElementFromArray(
      favorite.tracks,
      trackId,
    );

    const newTrackIds = common.removeElementFromArrayAtIndex(
      favorite.tracks,
      indexTrackId,
    );

    try {
      await this.favoritesRepository.updateFavoriteTrack(
        favorite.id,
        newTrackIds,
        transaction,
      );
      await this.trackRepository.deleteTrack(trackId, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        trackId: trackId,
      },
      serviceId: FavoritesService.name,
      functionId: this.removeTrack.name,
    });
  }

  async createAlbum(albumId: string) {
    let album: Album = null;
    let favorite: Favorites = null;
    const isUuid = configService.verifyUuid(albumId);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumById(albumId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!album) {
      throw new UnprocessableEntityException();
    }

    try {
      favorite = await this.favoritesRepository.foundARecordFav();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    try {
      const addTrackId: string[] = [...favorite.albums, albumId];
      await this.sequelize.transaction(async (transaction: Transaction) => {
        if (!favorite) {
          favorite = await this.declareOneRecordFav(transaction);
        }

        await this.favoritesRepository.addAlbumIdToFavorite(
          favorite.id,
          addTrackId,
          transaction,
        );
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return new Response({
      data: favorite,
      serviceId: FavoritesService.name,
      functionId: this.createAlbum.name,
    });
  }

  async removeAlbum(albumId: string, transaction: Transaction) {
    let track: Track = null;
    let favorite: Favorites = null;
    const isTrackUuid = configService.verifyUuid(albumId);

    favorite = await this.favoritesRepository.findFavoriteTrack(albumId);

    if (!favorite) {
      throw new NotFoundException();
    }

    if (!isTrackUuid) {
      throw new BadRequestException();
    }

    try {
      track = await this.trackRepository.findTrackById(albumId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    const indexAlbumId = common.findIndexElementFromArray(
      favorite.tracks,
      albumId,
    );

    const newTrackIds = common.removeElementFromArrayAtIndex(
      favorite.tracks,
      indexAlbumId,
    );

    try {
      await this.favoritesRepository.addAlbumIdToFavorite(
        favorite.id,
        newTrackIds,
        transaction,
      );
      await this.albumRepository.deleteAlbum(albumId, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        albumId: albumId,
      },
      serviceId: FavoritesService.name,
      functionId: this.removeAlbum.name,
    });
  }

  async createArtist(artistId: string) {
    let artist: Artist = null;
    let favorite: Favorites = null;
    const isUuid = configService.verifyUuid(artistId);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(artistId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    try {
      favorite = await this.favoritesRepository.foundARecordFav();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    try {
      const addArtistIds: string[] = [...favorite.artists, artistId];
      await this.sequelize.transaction(async (transaction: Transaction) => {
        if (!favorite) {
          favorite = await this.declareOneRecordFav(transaction);
        }

        await this.favoritesRepository.addArtistIdToFavorite(
          favorite.id,
          addArtistIds,
          transaction,
        );
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await favorite.reload();

    return new Response({
      data: favorite,
      serviceId: FavoritesService.name,
      functionId: this.createArtist.name,
    });
  }

  async removeArtist(artistId: string, transaction: Transaction) {
    let artist: Artist = null;
    let favorite: Favorites = null;
    const isTrackUuid = configService.verifyUuid(artistId);

    favorite = await this.favoritesRepository.findFavoriteTrack(artistId);

    if (!favorite) {
      throw new NotFoundException();
    }

    if (!isTrackUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(artistId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    const indexArtistId = common.findIndexElementFromArray(
      favorite.artists,
      artistId,
    );

    const newArtistIds = common.removeElementFromArrayAtIndex(
      favorite.artists,
      indexArtistId,
    );

    try {
      await this.favoritesRepository.addAlbumIdToFavorite(
        favorite.id,
        newArtistIds,
        transaction,
      );
      await this.artistRepository.deleteArtist(artistId, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        artistId: artistId,
      },
      serviceId: FavoritesService.name,
      functionId: this.removeArtist.name,
    });
  }
}
