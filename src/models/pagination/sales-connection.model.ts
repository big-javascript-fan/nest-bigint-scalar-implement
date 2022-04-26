import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Estate } from '../estate.model';

@ObjectType()
export class DirectOfferConnection extends PaginatedResponse(Estate) {
  @Field(() => BigInt, { nullable: true })
  endCursor: BigInt;

  @Field(() => BigInt, { nullable: true })
  startCursor: BigInt;
}
