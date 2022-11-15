import { Node } from '@forumCommon/pagination/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Users extends Node {
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;
}
