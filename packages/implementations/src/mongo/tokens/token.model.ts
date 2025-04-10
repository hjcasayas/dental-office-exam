import { tokens, type TokenEntity } from '@dental/features';
import { Document, model, Model, Schema, SchemaTypes } from 'mongoose';

export type TokenDoc = TokenEntity & Document;

interface TokenModelImpl extends Model<TokenDoc> {
  save: (token: TokenEntity) => Promise<TokenDoc>;
}

const tokenSchema = new Schema({
  token: {
    type: SchemaTypes.String,
    required: true,
    index: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: SchemaTypes.String,
    enum: [tokens.access, tokens.refresh],
    required: true,
  },
  expires: {
    type: SchemaTypes.Date,
    required: true,
  },
  blacklisted: {
    type: SchemaTypes.Boolean,
    required: false,
  },
});

tokenSchema.statics.save = async (
  tokenEntity: TokenEntity
): Promise<TokenDoc> => {
  return await TokenModel.create(tokenEntity);
};

const TokenModel = model<TokenDoc, TokenModelImpl>('Token', tokenSchema);

export { TokenModel };
