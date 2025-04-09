export interface ComparePasswordServiceParams {
  password: string;
  hashedPassword: string;
}

type ComparePasswordServiceResult = boolean;

export type ComparePasswordService = (
  params: ComparePasswordServiceParams
) => Promise<ComparePasswordServiceResult>;
