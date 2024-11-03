import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    private readonly userService: UserService,
    private readonly PostService: PostService
  ) { }

  async create(userId: number, createCommentDto: CreateCommentDto) {
    try {
      const user = await this.userService.findOneById(userId)
      const post = await this.PostService.findOneById(createCommentDto?.postId)
      const createComment = this.commentRepository.create({
        content: createCommentDto.content,
        user: user,
        post: post
      })
      const saveComment = await this.commentRepository.save(createComment)
      return saveComment
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const comments = await this.commentRepository.find({
        relations: {
          user: true,
          post: true
        }
      })
      return comments
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: number): Promise<CommentEntity> {
    try {
      const comment = await this.commentRepository.findOne({
        where: {
          id: id
        }
      })
      if (_.isEmpty(comment)) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }
      return comment
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.findOneById(id)
      if (!_.isEmpty(updateCommentDto?.content)) {
        comment.content = updateCommentDto?.content
      }
      const updateComment = await this.commentRepository.save(comment)
      return updateComment
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      await this.commentRepository
        .createQueryBuilder('comment')
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `This action removes a #${id} comment`;
    } catch (error) {
      throw error
    }
  }
}
