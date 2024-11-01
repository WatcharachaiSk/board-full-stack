import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

describe('PostService', () => {
  let service: PostService;
  let repository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postDto = { title: 'Test Title', content: 'Test Content' }; // Example DTO
      const createdPost = { id: 1, ...postDto };

      jest.spyOn(repository, 'save').mockResolvedValue(createdPost as PostEntity);

      const result = await service.create(createdPost.id, postDto);

      expect(result).toEqual(createdPost);
      expect(repository.save).toHaveBeenCalledWith(postDto);
    });
  });

  describe('getPostById', () => {
    it('should return a post by ID', async () => {
      const postId = 1;
      const foundPost = { id: postId, title: 'Test Title', content: 'Test Content' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(foundPost as PostEntity);

      const result = await service.findOne(postId);

      expect(result).toEqual(foundPost);
      expect(repository.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw an error if post not found', async () => {
      const postId = 999;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(postId)).rejects.toThrow(`Post with ID ${postId} not found`);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updateDto = { title: 'Updated Title', content: 'Updated Content' };
      const existingPost = { id: postId, title: 'Old Title', content: 'Old Content' };
      const updatedPost = { ...existingPost, ...updateDto };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPost as PostEntity);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedPost as PostEntity);

      const result = await service.update(postId, updateDto);

      expect(result).toEqual(updatedPost);
      expect(repository.save).toHaveBeenCalledWith(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 1;
      const existingPost = { id: postId, title: 'Title', content: 'Content' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPost as PostEntity);
      jest.spyOn(repository, 'remove').mockResolvedValue(existingPost as PostEntity);

      const result = await service.remove(postId);

      expect(result).toEqual(existingPost);
      expect(repository.remove).toHaveBeenCalledWith(existingPost);
    });

    it('should throw an error if post not found for deletion', async () => {
      const postId = 999;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(postId)).rejects.toThrow(`Post with ID ${postId} not found`);
    });
  });
});
