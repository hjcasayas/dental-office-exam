import { createServer } from 'node:http';
import { app } from '@dental/express-app';

main();

async function main() {
  const PORT = process.env.PORT ?? 8080;
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
