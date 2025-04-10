import type { Service } from '../common/index.js';
import type { TokenEntity } from './token.entity.js';

type SaveTokenServiceParams = TokenEntity;

type SaveTokenServiceResult = TokenEntity;

type SaveTokenService = Service<
  SaveTokenServiceParams,
  Promise<SaveTokenServiceResult>
>;

export type {
  SaveTokenService,
  SaveTokenServiceParams,
  SaveTokenServiceResult,
};
