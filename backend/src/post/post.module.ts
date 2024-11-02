import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CommunityEntity } from 'src/community/entities/community.entity';
import { CommunityService } from 'src/community/community.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, CommunityEntity]),
  ],
  controllers: [PostController],
  providers: [PostService, UserService, CommunityService]
})
export class PostModule { }
