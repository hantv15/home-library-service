// Nest dependencies
import { Injectable } from '@nestjs/common';

// Other dependencies
import { FindOptions, Op, Transaction } from 'sequelize';

// Local files
import { CreateTrackDto } from '../../v1/track/dto/create-track.dto';
import { UpdateTrackDto } from '../../v1/track/dto/update-track.dto';
import { Track } from '../models/track.model';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class TrackRepository extends BaseRepository<Track> {
  constructor() {
    super(Track);
  }

  async updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
    transaction: Transaction,
  ) {
    return await this.update(updateTrackDto, {
      where: {
        id: trackId,
      },
      transaction: transaction,
    });
  }

  async findTrackNameDifferentId(TrackId: string, nameTrack: string) {
    return await this.findOne({
      where: {
        id: { [Op.ne]: TrackId },
        name: { [Op.like]: `${nameTrack}%` },
      },
    });
  }

  async deleteTrack(TrackId: string, transaction: Transaction) {
    return await this.destroy({
      where: {
        id: TrackId,
      },
      transaction: transaction,
    });
  }

  async findAllTrack(options: FindOptions): Promise<{
    rows: Track[];
    count: number;
  }> {
    return await this.findAndCountAll(options);
  }

  async findTrackById(trackId: string) {
    return await this.findOne({
      where: {
        id: trackId,
      },
    });
  }

  async findTrackName(nameTrack: string) {
    return await this.findOne({
      where: {
        name: { [Op.like]: `${nameTrack}%` },
      },
    });
  }

  async createTrack(createTrackDto: CreateTrackDto, transaction: Transaction) {
    return await this.create(createTrackDto, { transaction });
  }
}
