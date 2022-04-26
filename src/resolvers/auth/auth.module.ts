import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { PrismaService } from '../../services/prisma.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { AuthService } from '../../services/auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../../services/user.service';
import { Web3Service } from 'src/services/web3.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    Web3Service,
    UserService,
    JwtStrategy,
    GqlAuthGuard,
    PrismaService
  ],
  exports: [GqlAuthGuard]
})
export class AuthModule {}
