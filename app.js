const path = require('path');
const express = require('express');
const app = express();

const db = require('./db');
const users = db.users;
console.log('users', users);
const { User } = db.models;

// const getAllUsers = async () => {
//   const users = await User.findAll();
//   return users.reduce((acc, user) => {
//     acc[user.name] = user;
//     return acc;
//   }, {});
// };

// const users = getAllUsers();

// const users = {
//   moe: {
//     id: 1,
//     name: 'moe',
//     favoriteWord: 'foo'
//   },
//   lucy: {
//     id: 2,
//     name: 'lucy',
//     favoriteWord: 'bar'
//   }
// };

app.use(express.json());

app.use(
  require('express-session')({
    secret: process.env.SECRET
  })
);

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.post('/api/sessions', (req, res, next) => {
  const user = users[req.body.username];
  if (user) {
    req.session.user = user;
    return res.send(user);
  }
  next({ status: 401 });
});

app.get('/api/sessions', (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

app.delete('/api/sessions', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
