import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TestService } from 'src/services/test.service';

@Resolver()
export class TestResolver {
  constructor(private testService: TestService) {}

  @Mutation(() => Boolean)
  async createFakeAccounts(
    @Args('amount') amount: number = 20
  ): Promise<Boolean> {
    await this.testService.createFakeAccounts(amount);
    return true;
  }
}
