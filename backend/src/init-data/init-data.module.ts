import { Module } from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from 'src/community/entities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityEntity])
  ],
  providers: [InitDataService]
})
export class InitDataModule { }
