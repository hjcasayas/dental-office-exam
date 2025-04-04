interface AddUserServiceParams {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}

type AddUserServiceResult = void;

type AddUserService = (
  params: AddUserServiceParams
) => Promise<AddUserServiceResult>;

export { type AddUserService };
