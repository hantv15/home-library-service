// Nest dependencies
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Other dependencies
import { FindOptions, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Local files
import { Op } from 'sequelize';
import { Artist } from '../../shared/models/artist.model';
import { Pagination } from '../../shared/paginagtion';
import { AlbumRepository } from '../../shared/repositories/album.repository';
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { TrackRepository } from '../../shared/repositories/track.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { getFromToDate } from '../../shared/utilities/get-from-to-date';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FilterArtistDto } from './dto/filter-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly favoritesService: FavoritesService,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
    private sequelize: Sequelize,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    let artist: Artist = null;
    const artistName: string =
      createArtistDto?.name?.toLocaleLowerCase()?.trim() || null;
    const isGrammy: boolean = createArtistDto.grammy || false;

    if (!artistName) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistName(artistName);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (artist) {
      throw new ConflictException();
    }

    try {
      const newArtist: Artist = await this.sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.artistRepository.createArtist(
            {
              name: artistName,
              grammy: isGrammy,
            },
            transaction,
          );
        },
      );

      return new Response({
        data: newArtist,
        serviceId: ArtistService.name,
        functionId: this.create.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(filterArtistDto: FilterArtistDto) {
    const whereOptions: WhereOptions = {};

    const limit = filterArtistDto?.limit ? configService.getEnv('LIMIT') : 12;
    const page = filterArtistDto?.limit ? configService.getEnv('PAGE') : 1;
    const order = filterArtistDto?.order ? filterArtistDto?.order : 'desc';

    const orderBy = filterArtistDto?.orderBy
      ? filterArtistDto?.orderBy
      : 'createdAt';

    const { fromDate, toDate } = getFromToDate(
      filterArtistDto.from,
      filterArtistDto.to,
    );

    whereOptions.createdAt = { [Op.between]: [fromDate, toDate] };

    if (filterArtistDto.name) {
      whereOptions.name = { [Op.like]: `${filterArtistDto.name}` };
    }

    const findsOptions: FindOptions = {
      where: whereOptions,
      order: [[orderBy, order]],
      limit: +limit,
      offset: +limit * (+page - 1),
    };

    try {
      const { rows, count } =
        await this.artistRepository.findAllArtist(findsOptions);

      return new Pagination({
        data: rows,
        totalItems: +count,
        limit,
        currentPage: +page,
        serviceId: ArtistService.name,
        functionId: this.findAll.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    let artist: Artist = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    try {
      return new Response({
        data: artist,
        serviceId: ArtistService.name,
        functionId: this.findOne.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    let artist: Artist = null;
    const isUuid = configService.verifyUuid(id);
    const artistName: string =
      updateArtistDto?.name?.toLocaleLowerCase()?.trim() || null;

    const isGrammy: boolean = updateArtistDto.grammy || false;

    if (!artistName) {
      throw new BadRequestException();
    }

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistNameDifferentId(
        id,
        artistName,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (artist) {
      throw new ConflictException();
    }

    try {
      artist = await this.artistRepository.findArtistById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    await this.sequelize.transaction(async (transaction: Transaction) => {
      await this.artistRepository.updateArtist(
        id,
        {
          name: artistName,
          grammy: isGrammy,
        },
        transaction,
      );
    });

    await artist.reload();

    return new Response({
      data: artist,
      serviceId: ArtistService.name,
      functionId: this.update.name,
    });
  }

  async remove(id: string, transaction: Transaction) {
    let artist: Artist = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      artist = await this.artistRepository.findArtistById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    try {
      await this.favoritesService.deleteFavoriteArtistWhenArtistDelete(
        id,
        transaction,
      );
      await this.albumRepository.updateArtistIdOfAllNullAlbum(id, transaction);
      await this.trackRepository.updateArtistIdOfAllNullTrack(id, transaction);

      await this.artistRepository.deleteArtist(id, transaction);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return new Response({
      data: {
        artistId: artist.id,
      },
      serviceId: ArtistService.name,
      functionId: this.remove.name,
    });
  }
}
