import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { PrismaService } from './prisma.service';
import { Token } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  validateUser(userId: bigint): Promise<users> {
    return this.prisma.users.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<users> {
    const id = (this.jwtService.decode(token) as { userId: bigint }).userId;
    return this.prisma.users.findUnique({
      where: { id: id }
    });
  }

  generateToken(payload: {
    userId: bigint;
    password?: string;
    is_admin?: boolean;
    method?: string;
  }): Token {
    function toJson(data) {
      return JSON.stringify(data, (_, v) =>
        typeof v === 'bigint' ? `${v}n` : v
      ).replace(/"(-?\d+)n"/g, (_, a) => a);
    }
    const payloadObj = JSON.parse(toJson({ ...payload }));
    const accessToken = this.jwtService.sign(payloadObj, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    });
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshToken = this.jwtService.sign(payloadObj, {
      expiresIn: securityConfig.refreshIn
    });

    return {
      accessToken,
      refreshToken
    };
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);

      return this.generateToken({
        userId
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
