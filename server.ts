// server.ts

import { NextServer } from 'next/dist/server/next';
import { createServer } from 'http';
import { connectToDatabase, closeDatabaseConnection } from './lib/mongodb'

async function startServer(nextApp: NextServer) {
  const port = parseInt(process.env.PORT || '3000', 10);
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const server = createServer(async (req, res) => {
    handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return server;
}

async function main() {
  try {
    const nextApp = require('next')({ dev: process.env.NODE_ENV !== 'production' });

    await connectToDatabase();

    const server = await startServer(nextApp);

    // Закрываем соединение при завершении процесса
    process.on('exit', async () => {
      await closeDatabaseConnection();
      server.close();
      
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
