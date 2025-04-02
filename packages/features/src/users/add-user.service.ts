interface AddUserServiceParams {
  firstName: string;
  lastName: string;
  email: string;
}

type AddUserServiceResult = void;

type AddUserService = (
  params: AddUserServiceParams
) => Promise<AddUserServiceResult>;

const addUserService =
  (implementation: AddUserService) =>
  async ({ firstName, lastName, email }: AddUserServiceParams) => {
    await implementation({ firstName, lastName, email });
    return;
  };

export { addUserService, type AddUserService };
