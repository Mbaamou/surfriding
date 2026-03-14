const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config');

// Connect to MongoDB
connectDB();

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT} (${config.NODE_ENV})`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
