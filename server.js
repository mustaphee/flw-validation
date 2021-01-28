const app = require('./src/app');

const PORT = process.env.PORT || 8010;

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`FLW Test App running on PORT ${PORT}`));

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error('FATAL UNEXPECTED UNHANDLED REJECTION!', error.message);
  server.close(() => process.exit(0));
});
