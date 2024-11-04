import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

describe('CommentService', () => {
  let service: CommentService;
  let userService: UserService;
  let postService: PostService;
  let commentRepository: Repository<CommentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: PostService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CommentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
    commentRepository = module.get<Repository<CommentEntity>>(getRepositoryToken(CommentEntity));
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const userId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test comment', postId: 1 };

      // Mock the user object with all required fields in UserEntity
      const user = {
        id: userId,
        username: 'testuser',
        posts: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as UserEntity;

      // Mock the post object with all required fields in PostEntity
      const post = {
        id: createCommentDto.postId,
        title: 'Test Post',
        content: 'This is a test post',
        user: user,
        community: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
      } as any;

      const createdComment = {
        id: 1,
        content: createCommentDto.content,
        user,
        post,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findOneById').mockResolvedValue(user);
      jest.spyOn(postService, 'findOneById').mockResolvedValue(post);
      jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment as any);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment as any);

      const result = await service.create(userId, createCommentDto);
      expect(result).toEqual(createdComment);
      expect(userService.findOneById).toHaveBeenCalledWith(userId);
      expect(postService.findOneById).toHaveBeenCalledWith(createCommentDto.postId);
      expect(commentRepository.save).toHaveBeenCalledWith(createdComment);
    });
  });

  describe('findAll', () => {
    it('should return all comments with relations', async () => {
      const comments = [{ id: 1, content: 'Test comment', user: {}, post: {} }];
      jest.spyOn(commentRepository, 'find').mockResolvedValue(comments as any);

      const result = await service.findAll();
      expect(result).toEqual(comments);
      expect(commentRepository.find).toHaveBeenCalledWith({
        relations: { user: true, post: true },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a comment by ID', async () => {
      const commentId = 1;
      const comment = { id: commentId, content: 'Test comment' };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(comment as any);

      const result = await service.findOneById(commentId);
      expect(result).toEqual(comment);
      expect(commentRepository.findOne).toHaveBeenCalledWith({ where: { id: commentId } });
    });

    it('should throw an exception if comment not found', async () => {
      const commentId = 999;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOneById(commentId)).rejects.toThrow(
        new HttpException('Comment not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a comment', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated content' };
      const comment = { id: commentId, content: 'Old content' };
      const updatedComment = { ...comment, content: updateCommentDto.content };

      jest.spyOn(service, 'findOneById').mockResolvedValue(comment as any);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment as any);

      const result = await service.update(commentId, updateCommentDto);
      expect(result).toEqual(updatedComment);
      expect(service.findOneById).toHaveBeenCalledWith(commentId);
      expect(commentRepository.save).toHaveBeenCalledWith(updatedComment);
    });
  });

  describe('remove', () => {
    it('should soft delete a comment by ID', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
        softDelete: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 1 }),
      } as any);

      const result = await service.remove(commentId);
      expect(result).toEqual(`This action removes a #${commentId} comment`);
      expect(commentRepository.createQueryBuilder).toHaveBeenCalledWith('comment');
    });
  });
});
