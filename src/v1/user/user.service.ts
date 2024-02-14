// Nest dependencies
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Other dependencies
import * as bcrypt from 'bcrypt';
import { FindOptions, Op, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// Local file
import { User } from '../../shared/models/user.model';
import { Pagination } from '../../shared/paginagtion';
import { UserRepository } from '../../shared/repositories/user.repository';
import { Response } from '../../shared/response';
import { configService } from '../../shared/services/config.service';
import { getFromToDate } from '../../shared/utilities/get-from-to-date';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let foundLogin: User = null;
    const loginName: string = createUserDto.login.toLocaleLowerCase();

    if (createUserDto.password !== createUserDto.verifyPassword) {
      throw new ForbiddenException();
    }

    try {
      foundLogin = await this.userRepository.findLoginName(loginName);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (foundLogin) {
      throw new ConflictException();
    }

    try {
      const hash = await configService.hashPassword(
        createUserDto.verifyPassword,
      );

      const payloadCreateUser = {
        login: loginName,
        password: hash,
      };

      const newUser = await this.sequelize.transaction(
        async (transaction: Transaction) => {
          return await this.userRepository.createUser(
            payloadCreateUser,
            transaction,
          );
        },
      );

      delete newUser.dataValues.password;

      return new Response({
        data: newUser,
        serviceId: UserService.name,
        functionId: this.create.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(filterUserDto: FilterUserDto) {
    const whereOptions: WhereOptions = {};
    const limit = filterUserDto?.limit ? configService.getEnv('LIMIT') : 12;
    const page = filterUserDto?.limit ? configService.getEnv('PAGE') : 1;

    const order = filterUserDto?.order ? filterUserDto?.order : 'desc';
    const orderBy = filterUserDto?.orderBy
      ? filterUserDto?.orderBy
      : 'createdAt';

    const { fromDate, toDate } = getFromToDate(
      filterUserDto.from,
      filterUserDto.to,
    );

    whereOptions.createdAt = { [Op.between]: [fromDate, toDate] };

    if (filterUserDto.loginName) {
      whereOptions.login = { [Op.like]: `${filterUserDto.loginName}%` };
    }

    const findsOptions: FindOptions = {
      where: whereOptions,
      order: [[orderBy, order]],
      limit: +limit,
      offset: +limit * (+page - 1),
    };

    try {
      const { rows, count } =
        await this.userRepository.findAllUser(findsOptions);

      return new Pagination({
        data: rows,
        totalItems: +count,
        limit,
        currentPage: +page,
        serviceId: UserService.name,
        functionId: this.findAll.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    let user: User = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      user = await this.userRepository.findUserById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    try {
      delete user.dataValues.password;

      return new Response({
        data: user,
        serviceId: UserService.name,
        functionId: this.findOne.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user: User = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      user = await this.userRepository.findUserById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    // check old password
    const isMatch = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new ForbiddenException();
    }

    const newPassword = await configService.hashPassword(
      updateUserDto.newPassword,
    );

    try {
      await this.sequelize.transaction(async (transaction: Transaction) => {
        return await this.userRepository.updateUserPassword(
          id,
          newPassword,
          transaction,
        );
      });

      return new Response({
        data: user,
        serviceId: UserService.name,
        functionId: this.update.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    let user: User = null;
    const isUuid = configService.verifyUuid(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    try {
      user = await this.userRepository.findUserById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    try {
      await this.sequelize.transaction(async (transaction: Transaction) => {
        await this.userRepository.deleteUser(id, transaction);
      });

      return new Response({
        data: {
          userId: user.id,
        },
        serviceId: UserService.name,
        functionId: this.remove.name,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
