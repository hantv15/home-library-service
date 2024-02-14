// Nest dependencies
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Other dependencies
import { FindOptions, Op, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Local files
import { Album } from '../../shared/models/album.model';
import { Artist } from '../../shared/models/artist.model';
import { Pagination } from '../../shared/paginagtion';
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { getFromToDate } from '../../shared/utilities/get-from-to-date';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FilterAlbumDto } from './dto/filter-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favoritesService: FavoritesService,
    private sequelize: Sequelize,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    let album: Album = null;
    let artist: Artist = null;
    const nameAlbum: string =
      createAlbumDto?.name?.toLocaleLowerCase().trim() || null;

    const year: number = createAlbumDto.year;
    const artistId: string | null = createAlbumDto.artistId || null;

    try {
      album = await this.albumRepository.findAlbumName(nameAlbum);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (album) {
      throw new ConflictException();
    }

    try {
      if (artistId) {
        artist = await this.artistRepository.findArtistById(artistId);
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }

    const notFoundArtist = artistId && !artist;
    if (notFoundArtist) {
      throw new NotFoundException();
    }

    try {
      const newAlbum = await this.sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.albumRepository.createAlbum(
            {
              name: nameAlbum,
              year: year,
              artistId: artistId,
            },
            transaction,
          );
        },
      );

      return new Response({
        data: newAlbum,
        serviceId: AlbumService.name,
        functionId: this.create.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(filterAlbumDto: FilterAlbumDto) {
    const whereOptions: WhereOptions = {};
    const limit = filterAlbumDto?.limit ? configService.getEnv('LIMIT') : 12;
    const page = filterAlbumDto?.limit ? configService.getEnv('PAGE') : 1;

    const order = filterAlbumDto?.order ? filterAlbumDto?.order : 'desc';
    const orderBy = filterAlbumDto?.orderBy
      ? filterAlbumDto?.orderBy
      : 'createdAt';

    const { fromDate, toDate } = getFromToDate(
      filterAlbumDto.from,
      filterAlbumDto.to,
    );

    whereOptions.createdAt = { [Op.between]: [fromDate, toDate] };

    if (filterAlbumDto.name) {
      whereOptions.name = { [Op.like]: `${filterAlbumDto.name}` };
    }

    if (filterAlbumDto.year) {
      whereOptions.year = filterAlbumDto.year;
    }

    if (filterAlbumDto.artistId) {
      whereOptions.artistId = filterAlbumDto.artistId;
    }

    const findsOptions: FindOptions = {
      where: whereOptions,
      order: [[orderBy, order]],
      limit: +limit,
      offset: +limit * (+page - 1),
    };

    try {
      const { rows, count } =
        await this.albumRepository.findAllAlbum(findsOptions);

      return new Pagination({
        data: rows,
        totalItems: +count,
        limit,
        currentPage: +page,
        serviceId: AlbumService.name,
        functionId: this.findAll.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    let album: Album = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    try {
      delete album.dataValues.password;

      return new Response({
        data: album,
        serviceId: AlbumService.name,
        functionId: this.findOne.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album: Album = null;
    let artist: Artist = null;
    const nameAlbum: string =
      updateAlbumDto?.name?.toLocaleLowerCase()?.trim() || null;
    const year: number = updateAlbumDto.year;
    const artistId: string | null = updateAlbumDto.artistId || null;

    if (!nameAlbum) {
      throw new BadRequestException();
    }

    const isUuid = configService.verifyUuid(id);
    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumNameDifferentId(
        id,
        nameAlbum,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (album) {
      throw new ConflictException();
    }

    try {
      album = await this.albumRepository.findAlbumById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    try {
      if (artistId) {
        artist = await this.artistRepository.findArtistById(artistId);
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }

    const notFoundArtist = artistId && !artist;
    if (notFoundArtist) {
      throw new NotFoundException();
    }

    try {
      await this.sequelize.transaction(async (transaction: Transaction) => {
        await this.albumRepository.updateAlbum(
          id,
          {
            name: nameAlbum,
            year: year || album.year,
            artistId: artistId,
          },
          transaction,
        );

        if (artistId) {
          await this.trackRepository.updateAlbumIdAndArtistOfTrack(
            id,
            artistId,
            transaction,
          );
        }
      });

      await album.reload();

      return new Response({
        data: album,
        serviceId: AlbumService.name,
        functionId: this.update.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string, transaction: Transaction) {
    let album: Album = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      album = await this.albumRepository.findAlbumById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    try {
      await this.favoritesService.deleteFavoriteAlbumWhenAlbumDelete(
        id,
        transaction,
      );

      await this.trackRepository.updateAlbumIdOfAllNullTrack(id, transaction);
      await this.albumRepository.deleteAlbum(id, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        albumId: album.id,
      },
      serviceId: ArtistRepository.name,
      functionId: this.remove.name,
    });
  }
}
