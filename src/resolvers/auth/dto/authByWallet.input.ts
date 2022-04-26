import { IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthByWalletInput {
  @Field()
  @IsNotEmpty()
  @Length(42)
  wallet: string;

  @Field()
  @IsNotEmpty()
  signature: string;

  @Field({ defaultValue: 'mumbai' })
  network: string;
}
