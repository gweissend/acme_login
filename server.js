const db = require('./db');

db.syncAndSeed().then(() => {
  const app = require('./app');
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
});
