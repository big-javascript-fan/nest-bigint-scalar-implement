import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { User } from './user.model';

@ObjectType()
export class Users {
  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }

  @Field(() => [User], { nullable: true })
  users: User[];

  // count aliases
  @HideField()
  _count?: { users?: number };

  @Field(() => Number, { nullable: true })
  @Expose()
  get usersCount(): number {
    return this._count ? this._count.users : 0;
  }
}
