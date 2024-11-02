import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { UserService } from '../user/user.service';
import { CommunityService } from '../community/community.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserEntity } from '../user/entities/user.entity';
import { CommunityEntity } from '../community/entities/community.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<PostEntity>;
  let userService: UserService;
  let communityService: CommunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: CommunityService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
    userService = module.get<UserService>(UserService);
    communityService = module.get<CommunityService>(CommunityService);
  });

  it('should create a post successfully', async () => {
    // This test case verifies that the post creation process works as expected when valid user and community entities are provided.
    const userId = 1;
    const createPostDto: CreatePostDto = {
      title: 'Test Post',
      content: 'This is a test post',
      communityId: 1,
    };

    const user: UserEntity = {
      id: userId,
      username: 'testuser',
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const community: CommunityEntity = {
      id: createPostDto.communityId,
      title: 'Test Community',
      posts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdPost: PostEntity = {
      id: 1,
      title: createPostDto.title,
      content: createPostDto.content,
      user: user,
      community: community,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userService, 'findOneById').mockResolvedValue(user);
    jest.spyOn(communityService, 'findOneById').mockResolvedValue(community);
    jest.spyOn(postRepository, 'create').mockReturnValue(createdPost);
    jest.spyOn(postRepository, 'save').mockResolvedValue(createdPost);

    const result = await service.create(userId, createPostDto);
    expect(result).toEqual(createdPost);
    expect(userService.findOneById).toHaveBeenCalledWith(userId);
    expect(communityService.findOneById).toHaveBeenCalledWith(createPostDto.communityId);
    expect(postRepository.create).toHaveBeenCalledWith({
      title: createPostDto.title,
      content: createPostDto.content,
      user: user,
      community: community,
    });
    expect(postRepository.save).toHaveBeenCalledWith(createdPost);
  });

  it('should throw an error if user not found', async () => {
    // This test case checks that an error is thrown when the user is not found in the database.
    const userId = 1;
    const createPostDto: CreatePostDto = {
      title: 'Test Post',
      content: 'This is a test post',
      communityId: 1,
    };

    jest.spyOn(userService, 'findOneById').mockResolvedValue(null);

    await expect(service.create(userId, createPostDto)).rejects.toThrow();
    expect(userService.findOneById).toHaveBeenCalledWith(userId);
  });

  it('should throw an error if community not found', async () => {
    // This test case ensures that an error is thrown when the community is not found in the database.
    const userId = 1;
    const createPostDto: CreatePostDto = {
      title: 'Test Post',
      content: 'This is a test post',
      communityId: 1,
    };

    const user: UserEntity = {
      id: userId,
      username: 'testuser',
      posts: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userService, 'findOneById').mockResolvedValue(user);
    jest.spyOn(communityService, 'findOneById').mockResolvedValue(null);

    await expect(service.create(userId, createPostDto)).rejects.toThrow();
    expect(userService.findOneById).toHaveBeenCalledWith(userId);
    expect(communityService.findOneById).toHaveBeenCalledWith(createPostDto.communityId);
  });

  it('should find all posts successfully', async () => {
    // This test case verifies that the service can retrieve all posts along with related user, comments, and community entities.
    const posts: PostEntity[] = [
      {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
        user: {
          id: 1,
          username: 'testuser',
          posts: [],
          comments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        community: {
          id: 1,
          title: 'Test Community',
          posts: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(postRepository, 'find').mockResolvedValue(posts);

    const result = await service.findAll();
    expect(result).toEqual(posts);
    expect(postRepository.find).toHaveBeenCalledWith({
      relations: {
        user: true,
        comments: true,
        community: true,
      },
    });
  });

  it('should find a post by id successfully', async () => {
    // This test case verifies that the service can retrieve a post by its id along with related user, comments, and community entities.
    const postId = 1;
    const post: PostEntity = {
      id: postId,
      title: 'Test Post',
      content: 'This is a test post',
      user: {
        id: 1,
        username: 'testuser',
        posts: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      community: {
        id: 1,
        title: 'Test Community',
        posts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(postRepository, 'findOne').mockResolvedValue(post);

    const result = await service.findOneById(postId);
    expect(result).toEqual(post);
    expect(postRepository.findOne).toHaveBeenCalledWith({
      where: { id: postId },
      relations: {
        user: true,
        comments: true,
        community: true,
      },
    });
  });

  it('should throw an error if post not found', async () => {
    // This test case ensures that an error is thrown when the post is not found by its id.
    const postId = 1;

    jest.spyOn(postRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOneById(postId)).rejects.toThrow(new HttpException('Post not found', HttpStatus.NOT_FOUND));
    expect(postRepository.findOne).toHaveBeenCalledWith({
      where: { id: postId },
      relations: {
        user: true,
        comments: true,
        community: true,
      },
    });
  });

  it('should update a post successfully', async () => {
    // This test case verifies that the service can update a post's title and content successfully.
    const postId = 1;
    const updatePostDto: UpdatePostDto = {
      title: 'Updated Title',
      content: 'Updated Content',
    };

    const existingPost: PostEntity = {
      id: postId,
      title: 'Old Title',
      content: 'Old Content',
      user: {
        id: 1,
        username: 'testuser',
        posts: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      community: {
        id: 1,
        title: 'Test Community',
        posts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedPost: PostEntity = {
      ...existingPost,
      title: updatePostDto.title,
      content: updatePostDto.content,
    };

    jest.spyOn(service, 'findOneById').mockResolvedValue(existingPost);
    jest.spyOn(postRepository, 'save').mockResolvedValue(updatedPost);

    const result = await service.update(postId, updatePostDto);
    expect(result).toEqual(updatedPost);
    expect(service.findOneById).toHaveBeenCalledWith(postId);
    expect(postRepository.save).toHaveBeenCalledWith(updatedPost);
  });

  it('should remove a post successfully', async () => {
    // This test case verifies that the service can remove a post by its id successfully.
    const postId = 1;

    jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
      softDelete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    } as any);

    const result = await service.remove(postId);
    expect(result).toEqual(`This action removes a #${postId} post`);
    expect(postRepository.createQueryBuilder).toHaveBeenCalledWith('post');
  });
});