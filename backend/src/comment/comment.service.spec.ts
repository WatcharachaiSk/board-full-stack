import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository: Repository<CommentEntity>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(CommentEntity),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<Repository<CommentEntity>>(getRepositoryToken(CommentEntity));
    userService = module.get<UserService>(UserService);
  });

  it('should create a comment successfully', async () => {
    // This test case verifies that the service can successfully create a comment.
    const userId = 1;
    const createCommentDto: CreateCommentDto = {
      content: 'This is a test comment',
      postId: 1,
    };
    const user = {
      id: userId,
      username: 'testuser',
    };
    const post = {
      id: createCommentDto.postId,
      title: 'Test Post',
    };
    const createdComment: CommentEntity = {
      id: 1,
      content: createCommentDto.content,
      user: user as any,
      post: post as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(user as any);
    jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(post as any);
    jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment);
    jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

    const result = await service.create(userId, createCommentDto);
    expect(result).toEqual(createdComment);
    expect(userService.findOneById).toHaveBeenCalledWith(userId);
    expect(userService.findOneById).toHaveBeenCalledWith(createCommentDto.postId);
    expect(commentRepository.create).toHaveBeenCalledWith({
      content: createCommentDto.content,
      user: user,
      post: post,
    });
    expect(commentRepository.save).toHaveBeenCalledWith(createdComment);
  });

  it('should find all comments successfully', async () => {
    // This test case verifies that the service can retrieve all comments.
    const comments: CommentEntity[] = [
      {
        id: 1,
        content: 'This is a test comment',
        user: {
          id: 1,
          username: 'testuser',
        } as any,
        post: {
          id: 1,
          title: 'Test Post',
        } as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(commentRepository, 'find').mockResolvedValue(comments);

    const result = await service.findAll();
    expect(result).toEqual(comments);
    expect(commentRepository.find).toHaveBeenCalledWith({
      relations: {
        user: true,
        post: true,
      },
    });
  });

  it('should find a comment by id successfully', async () => {
    // This test case verifies that the service can retrieve a comment by its id.
    const commentId = 1;
    const comment: CommentEntity = {
      id: commentId,
      content: 'This is a test comment',
      user: {
        id: 1,
        username: 'testuser',
      } as any,
      post: {
        id: 1,
        title: 'Test Post',
      } as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(commentRepository, 'findOne').mockResolvedValue(comment);

    const result = await service.findOneById(commentId);
    expect(result).toEqual(comment);
    expect(commentRepository.findOne).toHaveBeenCalledWith({
      where: { id: commentId },
    });
  });

  it('should throw an exception if comment by id not found', async () => {
    // This test case ensures that an exception is thrown if the comment by id is not found.
    const commentId = 1;

    jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOneById(commentId)).rejects.toThrow(
      new HttpException('Comment not found', HttpStatus.NOT_FOUND),
    );
  });

  it('should update a comment successfully', async () => {
    // This test case verifies that the service can update a comment's content successfully.
    const commentId = 1;
    const updateCommentDto: UpdateCommentDto = {
      content: 'Updated comment content',
    };
    const existingComment: CommentEntity = {
      id: commentId,
      content: 'Old comment content',
      user: {
        id: 1,
        username: 'testuser',
      } as any,
      post: {
        id: 1,
        title: 'Test Post',
      } as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedComment: CommentEntity = {
      ...existingComment,
      content: updateCommentDto.content,
    };

    jest.spyOn(service, 'findOneById').mockResolvedValue(existingComment);
    jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment);

    const result = await service.update(commentId, updateCommentDto);
    expect(result).toEqual(updatedComment);
    expect(service.findOneById).toHaveBeenCalledWith(commentId);
    expect(commentRepository.save).toHaveBeenCalledWith(updatedComment);
  });

  it('should remove a comment successfully', async () => {
    // This test case verifies that the service can remove a comment by its id successfully.
    const commentId = 1;
    const responseMessage = `This action removes a #${commentId} comment`;

    jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
      softDelete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await service.remove(commentId);
    expect(result).toEqual(responseMessage);
    expect(commentRepository.createQueryBuilder).toHaveBeenCalledWith('comment');
  });
});

