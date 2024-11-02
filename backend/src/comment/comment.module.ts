import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { CommunityEntity } from 'src/community/entities/community.entity';
import { CommunityService } from 'src/community/community.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, CommentEntity, CommunityEntity]),
  ],
  controllers: [CommentController],
  providers: [CommentService, PostService, UserService, CommunityService]
})
export class CommentModule { }
