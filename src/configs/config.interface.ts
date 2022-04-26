export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
  logger: LoggerConfig;
  rabbitmqConfig: RabbitMQConfig;
  adminWallet: AdminWallet;
}

export interface NetworkConfig {
  rpcProvider: string;
  nftABI: any;
  nftAddress: string;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

interface LoggerConfig {
  readonly level: string;
  readonly silence: string[];
}

interface RabbitMQConfig {
  readonly exchange: string;
  readonly name: string;
  readonly host: string;
  readonly vhost: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
}

interface AdminWallet {
  privKey: string;
}
