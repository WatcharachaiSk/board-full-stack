import { BaseEntity } from "src/base/base.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @Column()
  username: string

  @OneToMany(() => PostEntity, (post) => post.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: CommentEntity[];
}
