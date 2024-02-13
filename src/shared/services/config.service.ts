// Nest dependencies
import { SequelizeModuleOptions } from '@nestjs/sequelize';

// Other dependencies
import * as bcrypt from 'bcrypt';

// Local file
import { Album } from '../models/album.model';
import { Artist } from '../models/artist.model';
import { Favorites } from '../models/favorites.model';
import { Track } from '../models/track.model';
import { User } from '../models/user.model';

export class ConfigService {
  public getFormatDateTime() {
    return this.getEnv('FORMAT_DATE_TIME');
  }

  public getTimeZone() {
    return this.getEnv('TIME_ZONE');
  }

  public async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, +this.getEnv('SALT_LENGTH'));

    return hash;
  }

  public verifyUuid(uuid: string) {
    // link: https://melvingeorge.me/blog/check-if-string-valid-uuid-regex-javascript
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(uuid);
  }

  public getEnv(key: string): any {
    return process.env[key];
  }

  public getSequelizeConfig(): any {
    const config: SequelizeModuleOptions = {
      dialect: this.getEnv('DB_TYPE') || 'mysql',
      host: this.getEnv('DB_HOST') || 'localhost',
      port: this.getEnv('DB_PORT') || 3306,
      username: this.getEnv('DB_USERNAME') || 'root',
      password: this.getEnv('DB_PASSWORD') || 'root',
      database: this.getEnv('DB_DATABASE') || 'test',
      models: [User, Artist, Album, Favorites, Track],
      autoLoadModels: true,
      synchronize: true,
      retryDelay: 3000, //ms
      retryAttempts: 10,
      sync: {
        alter: false,
      },
    };

    return config;
  }
}

export const configService = new ConfigService();
