const app = require('./src/app');

const PORT = process.env.PORT || 8010;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`FLW Test App running on PORT ${PORT}`));
