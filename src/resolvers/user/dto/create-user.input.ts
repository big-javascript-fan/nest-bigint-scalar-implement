import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  walletAddress: string;

  @Field({ nullable: true })
  status?: number;

  @Field({ nullable: true })
  nonce?: string;
}
