import { Node } from '@forumCommon/pagination/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Articles extends Node {
  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  image: string;
}
