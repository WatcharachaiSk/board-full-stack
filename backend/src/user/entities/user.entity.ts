import { BaseEntity } from "src/base/base.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @Column()
  username: string
}
