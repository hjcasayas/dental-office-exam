import {
  addUserServiceImpl,
  server as expressServer,
  getUserByEmailServiceImpl,
} from '@/implementations';
import { registerUseCase } from '@dental/features';
import { createServer } from 'node:http';

main();

async function main() {
  const PORT = process.env.PORT ?? 8080;

  const server = createServer(
    expressServer({
      registerUseCase: registerUseCase({
        getUserByEmailService: getUserByEmailServiceImpl,
        addUserService: addUserServiceImpl,
      }),
    })
  );

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
