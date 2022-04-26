import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../../models/user.model';
import { Users } from 'src/models/users.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return new User(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Query(() => User, { name: 'user' })
  async user(
    @Args('id', { nullable: true }) id: number,
    @Args('walletAddress', { nullable: true }) walletAddress: string
  ): Promise<User> {
    const user = await this.userService.findUserById(id, walletAddress);
    return new User({ ...user });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Users)
  async findUsers(
    @Args('limit', { nullable: true }) limit: number | null,
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('sortList', { nullable: true }) sortList: string | null
  ): Promise<{ users: User[]; usersCount: number }> {
    const { users, totalCount } = await this.userService.findUsers(
      limit,
      page,
      onePage,
      sortList
    );

    return { users, usersCount: totalCount };
  }
}
