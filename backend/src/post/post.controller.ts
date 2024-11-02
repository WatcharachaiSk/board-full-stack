import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: UserEntity, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(user.id, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.postService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
