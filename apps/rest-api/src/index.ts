import { server as expressServer } from '@dental/implementations';
import { createServer } from 'node:http';

main();

async function main() {
  const PORT = process.env.PORT ?? 8080;
  const server = createServer(expressServer);

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
