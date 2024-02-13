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
import { ArtistRepository } from '../../shared/repositories/artist.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { getFromToDate } from '../../shared/utilities/get-from-to-date';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FilterArtistDto } from './dto/filter-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private sequelize: Sequelize,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    let artist: Artist = null;
    const artistName: string = createArtistDto.name.toLocaleLowerCase();
    const isGrammy: boolean = createArtistDto.grammy || false;

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
    const {
      order = 'desc',
      orderBy = 'createdAt',
      from,
      to,
      limit = configService.getEnv('LIMIT') || 12,
      page = configService.getEnv('PAGE') || 1,
    } = filterArtistDto;

    const { fromDate, toDate } = getFromToDate(from, to);

    const whereOptions: WhereOptions = {
      createdAt: { [Op.between]: [fromDate, toDate] },
    };

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
    const artistName: string = updateArtistDto.name.toLocaleLowerCase();
    const isGrammy: boolean = updateArtistDto.grammy || false;

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

  async remove(id: string) {
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
      await this.sequelize.transaction(async (transaction: Transaction) => {
        await this.artistRepository.deleteArtist(id, transaction);
      });

      return new Response({
        data: {
          artistId: artist.id,
        },
        serviceId: ArtistService.name,
        functionId: this.remove.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
