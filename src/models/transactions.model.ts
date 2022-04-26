import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Transaction } from './transaction.model';

@ObjectType()
export class Transactions {
  constructor(partial: Partial<Transactions>) {
    Object.assign(this, partial);
  }

  @Field(() => [Transaction], { nullable: true })
  transactions: Transaction[];

  // count aliases
  @HideField()
  _count?: { transactions?: number };

  @Field(() => Number, { nullable: true })
  @Expose()
  get transactionsCount(): number {
    return this._count ? this._count.transactions : 0;
  }
}
