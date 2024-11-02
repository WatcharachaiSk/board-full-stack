import { BaseEntity } from "src/base/base.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('community')
export class CommunityEntity extends BaseEntity {
  @Column()
  title: string

  @OneToMany(() => PostEntity, (post) => post.community, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: PostEntity[];

}
