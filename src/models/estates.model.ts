import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Estate } from './estate.model';

@ObjectType()
export class Estates {
  constructor(partial: Partial<Estates>) {
    Object.assign(this, partial);
  }

  @Field(() => [Estate], { nullable: true })
  estates: Estate[];

  // count aliases
  @HideField()
  _count?: number;

  @Field(() => Number, { nullable: true })
  @Expose()
  get estatesCount(): number {
    return this._count ? this._count : 0;
  }
}
