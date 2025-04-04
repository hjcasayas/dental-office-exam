export interface HashPasswordServiceParams {
  password: string;
}

export interface HashPasswordServiceResult {
  hashedPassword: string;
}

export type HashPasswordService = (
  params: HashPasswordServiceParams
) => HashPasswordServiceResult;
