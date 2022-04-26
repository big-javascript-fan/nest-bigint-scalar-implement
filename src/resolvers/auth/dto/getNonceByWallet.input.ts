import { IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetNonceByWalletInput {
  @Field()
  @IsNotEmpty()
  @Length(42)
  wallet: string;
}
