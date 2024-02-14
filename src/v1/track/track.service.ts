// Nest dependencies
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Local files
import { FindOptions, Op, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Album } from '../../shared/models/album.model';
import { Artist } from '../../shared/models/artist.model';
import { Track } from '../../shared/models/track.model';
import { Pagination } from '../../shared/paginagtion';
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { getFromToDate } from '../../shared/utilities/get-from-to-date';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FilterTrackDto } from './dto/filter-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly favoritesService: FavoritesService,
    private sequelize: Sequelize,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    let track: Track = null;
    let album: Album = null;
    let artist: Artist = null;

    const trackName: string = createTrackDto.name.toLocaleLowerCase();
    const artistId: string | null = createTrackDto.artistId || null;
    const albumId: string | null = createTrackDto.albumId || null;

    let isArtistUuid: boolean = true;
    let isAlbumUuid: boolean = true;
    const duration: number = createTrackDto.duration || null;

    let isArtistOfAlbum: boolean = false;

    try {
      track = await this.trackRepository.findTrackName(trackName);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (track) {
      throw new ConflictException();
    }

    if (artistId) {
      isArtistUuid = configService.verifyUuid(artistId);
    }

    if (!isArtistUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(artistId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (artistId && !artist) {
      throw new NotFoundException();
    }

    if (albumId) {
      isAlbumUuid = configService.verifyUuid(albumId);
    }

    if (!isAlbumUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumById(albumId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (albumId && !album) {
      throw new NotFoundException();
    }

    isArtistOfAlbum = album?.artistId !== artistId ? null : true;

    if (artistId && albumId && !isArtistOfAlbum) {
      throw new NotFoundException();
    }

    try {
      track = await this.sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.trackRepository.createTrack(
            {
              name: trackName,
              artistId: artistId,
              albumId: albumId,
              duration: duration,
            },
            transaction,
          );
        },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: track,
      serviceId: TrackRepository.name,
      functionId: this.create.name,
    });
  }

  async findAll(filterTrackDto: FilterTrackDto) {
    const whereOptions: WhereOptions = {};
    const limit = filterTrackDto?.limit ? configService.getEnv('LIMIT') : 12;
    const page = filterTrackDto?.limit ? configService.getEnv('PAGE') : 1;

    const order = filterTrackDto?.order ? filterTrackDto?.order : 'desc';
    const orderBy = filterTrackDto?.orderBy
      ? filterTrackDto?.orderBy
      : 'createdAt';

    const { fromDate, toDate } = getFromToDate(
      filterTrackDto.from,
      filterTrackDto.to,
    );

    whereOptions.createdAt = { [Op.between]: [fromDate, toDate] };

    if (filterTrackDto.name) {
      whereOptions.name = { [Op.like]: `${filterTrackDto.name}%` };
    }

    if (filterTrackDto.artistId) {
      whereOptions.artistId = filterTrackDto.artistId;
    }

    if (filterTrackDto.albumId) {
      whereOptions.albumId = filterTrackDto.albumId;
    }

    const findsOptions: FindOptions = {
      where: whereOptions,
      order: [[orderBy, order]],
      limit: +limit,
      offset: +limit * (+page - 1),
    };

    try {
      const { rows, count } =
        await this.trackRepository.findAllTrack(findsOptions);

      return new Pagination({
        data: rows,
        totalItems: +count,
        limit,
        currentPage: +page,
        serviceId: TrackService.name,
        functionId: this.findAll.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    let track: Track = null;
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
      throw new NotFoundException();
    }

    return new Response({
      data: track,
      serviceId: TrackService.name,
      functionId: this.findOne.name,
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    let track: Track = null;
    let album: Album = null;
    let artist: Artist = null;

    const trackName: string = updateTrackDto.name.toLocaleLowerCase();
    const artistId: string | null = updateTrackDto.artistId || null;
    const albumId: string | null = updateTrackDto.albumId || null;

    let isArtistUuid: boolean = true;
    let isAlbumUuid: boolean = true;
    const duration: number = updateTrackDto.duration || null;

    let isArtistOfAlbum: boolean = false;

    try {
      track = await this.trackRepository.findTrackNameDifferentId(
        id,
        trackName,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (track) {
      throw new ConflictException();
    }

    try {
      track = await this.trackRepository.findTrackById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    if (artistId) {
      isArtistUuid = configService.verifyUuid(artistId);
    }

    if (!isArtistUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(artistId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (artistId && !artist) {
      throw new NotFoundException();
    }

    if (albumId) {
      isAlbumUuid = configService.verifyUuid(albumId);
    }

    if (!isAlbumUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumById(albumId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (albumId && !album) {
      throw new NotFoundException();
    }

    isArtistOfAlbum = album?.artistId !== artistId ? null : true;

    if (artistId && albumId && !isArtistOfAlbum) {
      throw new NotFoundException();
    }

    try {
      await this.sequelize.transaction(async (transaction: Transaction) => {
        return await this.trackRepository.updateTrack(
          id,
          {
            name: trackName,
            artistId: artistId,
            albumId: albumId,
            duration: duration,
          },
          transaction,
        );
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    await track.reload();

    return new Response({
      data: track,
      serviceId: TrackRepository.name,
      functionId: this.create.name,
    });
  }

  async remove(id: string, transaction: Transaction) {
    let track: Track = null;
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
      throw new NotFoundException();
    }

    try {
      await this.favoritesService.deleteFavoriteTrackWhenTrackDelete(
        id,
        transaction,
      );

      await this.trackRepository.deleteTrack(id, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        trackId: track.id,
      },
      serviceId: TrackService.name,
      functionId: this.remove.name,
    });
  }
}
