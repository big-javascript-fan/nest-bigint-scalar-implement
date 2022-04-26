import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('BigInt', () => BigInt)
export class BigIntScalar implements CustomScalar<string, BigInt> {
  description = 'Bigint custom scalar type';

  parseValue(value: bigint): BigInt {
    return value; // value from the client
  }

  serialize(value: BigInt): string {
    return value.toString(); // value sent to the client
  }

  parseLiteral(ast: any): BigInt {
    if (ast.kind === Kind.INT) {
      return ast.toString();
    }
    return null;
  }
}
