import { BaseEntity } from "src/base/base.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('post')
export class PostEntity extends BaseEntity {
  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  
  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: CommentEntity[];
}
