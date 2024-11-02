import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from 'src/community/entities/community.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InitDataService {
  private logger = new Logger(InitDataService.name);
  constructor(
    @InjectRepository(CommunityEntity) private communityRepository: Repository<CommunityEntity>,
  ) {
    this.initCommunity();
  }

  async initCommunity() {
    try {
      const communityCount = await this.communityRepository.count();
      if (communityCount == 0) {
        const communities = [
          'History',
          'Food',
          'Pets',
          'Health',
          'Fashion',
          'Exercise',
          'Others',
        ];

        const communityEntities = communities.map(name => {
          const community = new CommunityEntity();
          community.title = name;
          return community;
        });

        await this.communityRepository.save(communityEntities);
        this.logger.log('Create data community completed');
        
      }
    } catch (error) {
      throw error;
    }
  }
}
