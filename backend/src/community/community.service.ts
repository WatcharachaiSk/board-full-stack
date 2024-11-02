import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from './entities/community.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity) private communityRepository: Repository<CommunityEntity>,
  ) { }

  async findAll() {
    try {
      const communitys = await this.communityRepository.find()
      return communitys
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: number): Promise<CommunityEntity> {
    try {
      const community = await this.communityRepository.findOne({
        where: {
          id: id
        }
      })
      if (_.isEmpty(community)) {
        throw new HttpException('Community not found', HttpStatus.NOT_FOUND);
      }
      return community
    } catch (error) {
      throw error
    }
  }
}
