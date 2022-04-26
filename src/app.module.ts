import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { AppResolver } from './resolvers/app.resolver';
import { DateScalar } from './common/scalars/date.scalar';
import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';
import { BigIntScalar } from './common/scalars/bigint.scalar';
import { NftModule } from './resolvers/nft/nft.module';
import { TestModule } from './resolvers/test/test.module';
import { HealthController } from './controllers/health/health.controller';
import { SelfHealthIndicator } from './controllers/health/self.healh';
import { PrismaModule } from './modules/prisma.module';
import { TransactionModule } from './resolvers/transaction/transaction.module';
import { EstateModule } from './resolvers/estates/estates.module';
import { Web3Module } from './modules/web3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          installSubscriptionHandlers: true,
          emitTypenameField: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer'
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination || './src/schema.graphql',
          debug: graphqlConfig.debug,
          formatError: error => {
            Logger.warn(error);
            return error;
          },
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req })
        };
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    NftModule,
    EstateModule,
    TransactionModule,
    // TestModule,
    Web3Module,
    PrismaModule,
    TerminusModule
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    AppResolver,
    DateScalar,
    BigIntScalar,
    SelfHealthIndicator
  ],
  exports: []
})
export class AppModule {}
