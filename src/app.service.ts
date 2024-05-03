import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';
@Injectable()
export class AppService {
  getHello() {
    try {
      if (true) {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
    // return "hello world"
  }
}
