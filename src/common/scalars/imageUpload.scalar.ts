import { FileUpload } from 'graphql-upload';
import { IsIn } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ReadStream } from 'fs';
import { GraphQLError, GraphQLScalarType } from 'graphql';
import * as FileType from 'file-type';


export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  async parseValue(value: Promise<AnyUpload>): Promise<AnyUpload> {
    const upload = await value;
    const stream = upload.createReadStream();
    const fileType = await FileType.fromStream(stream);

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError('Mime type does not match file content.');

    return upload;
  },
  parseLiteral(ast): void {
    throw new GraphQLError('Upload literal unsupported.', ast);
  },
  serialize(): void {
    throw new GraphQLError('Upload serialization unsupported.');
  }
});

export class AnyUpload implements FileUpload {
  mimetype: string;
  encoding: string;
  filename: string;

  @Exclude() /* Decorator so that the context of the function is not lost */
  createReadStream: () => ReadStream;
}

export class ImageUpload implements FileUpload {
  @IsIn(['image/jpeg', 'image/png', 'image/gif', undefined])
  mimetype: string;
  encoding: string;
  filename: string;

  @Exclude() /* Decorator so that the context of the function is not lost */
  createReadStream: () => ReadStream;
}
