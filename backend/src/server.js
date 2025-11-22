const http = require('http');
const env = require('./config/env');
const connectDatabase = require('./config/db');
const app = require('./app');

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);
  server.listen(env.port, () => {
    console.log(`🚀 Ethio Tech Hub API running on port ${env.port}`);
  });
};

startServer();


