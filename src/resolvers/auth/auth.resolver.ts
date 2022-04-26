import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import web3 from 'web3';
import * as sigUtil from 'eth-sig-util';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Auth, Nonce } from '../../models/auth.model';
import { Token } from '../../models/token.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AuthByWalletInput } from './dto/authByWallet.input';
import { UserService } from '../../services/user.service';
import { PrismaService } from '../../services/prisma.service';
import { GetNonceByWalletInput } from './dto/getNonceByWallet.input';
import { nonceGenerator } from '../../utils/nonceGenerator';
import { Web3Service } from 'src/services/web3.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UserService,
    private readonly web3Service: Web3Service,
    private readonly prisma: PrismaService
  ) {}

  @Query(() => Nonce)
  async getNonceByWallet(@Args('data') { wallet }: GetNonceByWalletInput) {
    wallet = web3.utils.toChecksumAddress(wallet);
    if (!web3.utils.isAddress(wallet)) {
      throw new BadRequestException('Invalid address');
    }

    const user = await this.userService.findOrCreateUserByWallet(
      web3.utils.toChecksumAddress(wallet)
    );

    return {
      nonce: user.nonce
    };
  }

  @Mutation(() => Auth)
  async authByWallet(@Args('data') { wallet, signature }: AuthByWalletInput) {
    if (!web3.utils.isAddress(wallet)) {
      throw new BadRequestException('Invalid address');
    }

    const user = await this.prisma.users.findUnique({
      where: {
        walletAddress: web3.utils.toChecksumAddress(wallet)
      }
    });

    if (!user) {
      throw new NotFoundException(
        'User is not defined in "Verify digital signature".'
      );
    }
    const message = `Marsverse will use this cryptographic signature for verifying that you are the owner of current Ethereum address ${parseInt(
      user.nonce,
      10
    )}`;
    console.log('will sign message', message);
    const recoveredAddress = sigUtil.recoverPersonalSignature({
      data: message,
      sig: signature
    });

    console.log('recovered address', recoveredAddress);

    if (
      !recoveredAddress ||
      recoveredAddress.toLowerCase() !== user.walletAddress.toLowerCase()
    ) {
      throw new UnauthorizedException('Signature verification failed');
    }

    await this.prisma.users.update({
      where: {
        walletAddress: web3.utils.toChecksumAddress(wallet)
      },
      data: {
        nonce: nonceGenerator(),
        status: 1
      }
    });

    return this.auth.generateToken({
      userId: user.id
    });
  }

  @Mutation(() => Token)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return new User(await this.auth.getUserFromToken(auth.accessToken));
  }
}
