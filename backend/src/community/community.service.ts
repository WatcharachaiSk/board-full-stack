import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunityService {

  findAll() {
    return `This action returns all community`;
  }
}
