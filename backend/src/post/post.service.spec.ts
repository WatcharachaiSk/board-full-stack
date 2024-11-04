import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { CommunityService } from 'src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

describe('PostService', () => {
  let service: PostService;
  let userService: UserService;
  let communityService: CommunityService;
  let postRepository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
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
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    communityService = module.get<CommunityService>(CommunityService);
    postRepository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const userId = 1;
      const createPostDto: CreatePostDto = { title: 'Test Post', content: 'This is a test post', communityId: 1 };

      const user = {
        id: userId,
        username: 'testuser',
        posts: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as UserEntity;

      const community = {
        id: createPostDto.communityId,
        name: 'Test Community',
        title: 'Community Title',
        posts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      const createdPost = {
        id: 1,
        ...createPostDto,
        user,
        community,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findOneById').mockResolvedValue(user);
      jest.spyOn(communityService, 'findOneById').mockResolvedValue(community);
      jest.spyOn(postRepository, 'create').mockReturnValue(createdPost as any);
      jest.spyOn(postRepository, 'save').mockResolvedValue(createdPost as any);

      const result = await service.create(userId, createPostDto);
      expect(result).toEqual(createdPost);
      expect(userService.findOneById).toHaveBeenCalledWith(userId);
      expect(communityService.findOneById).toHaveBeenCalledWith(createPostDto.communityId);
      expect(postRepository.save).toHaveBeenCalledWith(createdPost);
    });
  });
  describe('findAll', () => {
    it('should return all posts with relations', async () => {
      const posts = [{ id: 1, title: 'Test Post', content: 'This is a test post', user: {}, community: {}, comments: [] }];
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(posts),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(posts);
    });
  });

  describe('findOneById', () => {
    it('should return a post by ID', async () => {
      const postId = 1;
      const post = { id: postId, title: 'Test Post', content: 'This is a test post' };
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(post),
      } as any);

      const result = await service.findOneById(postId);
      expect(result).toEqual(post);
    });

    it('should throw an exception if post not found', async () => {
      const postId = 999;
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(undefined),
      } as any);

      await expect(service.findOneById(postId)).rejects.toThrow(
        new HttpException('Post not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('findByUserId', () => {
    it('should return posts by user ID', async () => {
      const userId = 1;
      const posts = [{ id: 1, title: 'Test Post', content: 'This is a test post', user: { id: userId } }];
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        loadRelationCountAndMap: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(posts),
      } as any);

      const result = await service.findByUserId(userId);
      expect(result).toEqual(posts);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updatePostDto: UpdatePostDto = { title: 'Updated Title', content: 'Updated Content' };
      const post = { id: postId, title: 'Old Title', content: 'Old Content' };
      const updatedPost = { ...post, ...updatePostDto };

      jest.spyOn(service, 'findOneById').mockResolvedValue(post as any);
      jest.spyOn(postRepository, 'save').mockResolvedValue(updatedPost as any);

      const result = await service.update(postId, updatePostDto);
      expect(result).toEqual(updatedPost);
      expect(service.findOneById).toHaveBeenCalledWith(postId);
      expect(postRepository.save).toHaveBeenCalledWith(updatedPost);
    });
  });

  describe('remove', () => {
    it('should soft delete a post by ID', async () => {
      const postId = 1;
      jest.spyOn(service, 'findOneById').mockResolvedValue({ id: postId } as any);
      jest.spyOn(postRepository, 'createQueryBuilder').mockReturnValue({
        softDelete: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 1 }),
      } as any);

      const result = await service.remove(postId);
      expect(result).toEqual(`This action removes a #${postId} post`);
      expect(postRepository.createQueryBuilder).toHaveBeenCalledWith('post');
    });
  });
});
