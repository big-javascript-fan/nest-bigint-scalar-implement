import * as fs from 'fs';
import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 4444
  },
  cors: {
    enabled: true
  },
  swagger: {
    enabled: true,
    title: 'NFT',
    description: 'nft',
    version: '1',
    path: 'api'
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true
  },
  security: {
    expiresIn: '2m',
    refreshIn: '30d',
    bcryptSaltOrRound: 10
  },
  adminWallet: {
    privKey: process.env.WALLET_PRIVATE_KEY
  },
  logger: {
    level: 'info',
    silence: []
  },

  rabbitmqConfig: {
    exchange: process.env.RABBITMQ_EXCHANGE,
    name: process.env.RABBITMQ_NAME,
    host: process.env.RABBITMQ_HOST,
    vhost: process.env.RABBITMQ_DEFAULT_VHOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10),
    username: process.env.RABBITMQ_DEFAULT_USER,
    password: process.env.RABBITMQ_DEFAULT_PASS
  }
};

export default (): Config => config;
