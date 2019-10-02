const { Sequelize } = require('sequelize');
const conn = new Sequelize('postgres://localhost/acme_login');
const { STRING } = Sequelize;

let users;

const User = conn.define('user', {
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  name: {
    type: STRING,
    allowNull: false
  },
  favoriteWord: {
    type: STRING,
    allowNull: false
  }
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const _users = [
    {
      name: 'moe',
      favoriteWord: 'foo',
      email: 'moe.gener@gmail.com',
      password: 'greyhatespeanuts'
    },
    {
      name: 'lucy',
      favoriteWord: 'bar',
      email: 'lucy.gener@gmail.com',
      password: 'greylikestherain'
    }
  ];
  users = await Promise.all(_users.map(user => User.create(user)));
};

module.exports = {
  syncAndSeed,
  models: {
    User
  },
  users
};
