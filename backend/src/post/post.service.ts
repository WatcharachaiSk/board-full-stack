import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as _ from 'lodash';
import { CommunityService } from 'src/community/community.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
    private readonly communityService: CommunityService
  ) { }

  async create(userId: number, createPostDto: CreatePostDto) {
    try {
      const user = await this.userService.findOneById(userId)
      const community = await this.communityService.findOneById(createPostDto?.communityId)
      const createPost = this.postRepository.create({
        title: createPostDto.title,
        content: createPostDto.content,
        user: user,
        community: community
      })
      const saveUser = await this.postRepository.save(createPost)
      return saveUser
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const postAll = await this.postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'commentUser')
        .leftJoinAndSelect('post.community', 'community')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .orderBy('post.createdAt', 'ASC')
        .getMany();
      return postAll;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number): Promise<PostEntity> {
    try {
      const post = await this.postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'commentUser')
        .leftJoinAndSelect('post.community', 'community')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .where('post.id = :id', { id })
        .orderBy('comments.createdAt', 'ASC')
        .getOne();
      if (_.isEmpty(post)) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post
    } catch (error) {
      throw error
    }
  }

  async findByUserId(userId: number): Promise<PostEntity[]> {
    try {
      const posts = await this.postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'commentUser')
        .leftJoinAndSelect('post.community', 'community')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .where('user.id = :userId', { userId })
        .orderBy('post.createdAt', 'ASC')
        .getMany();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.findOneById(id)
      if (!_.isEmpty(updatePostDto?.title)) {
        post.title = updatePostDto?.title
      }
      if (!_.isEmpty(updatePostDto?.content)) {
        post.content = updatePostDto?.content
      }
      if (updatePostDto?.communityId) {
        const community = await this.communityService.findOneById(updatePostDto?.communityId)
        post.community = community
      }
      const updatePost = await this.postRepository.save(post)
      return updatePost
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      await this.findOneById(id)
      await this.postRepository
        .createQueryBuilder('post')
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return `This action removes a #${id} post`;
    } catch (error) {
      throw error
    }
  }
}
