const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
const dotenv = require('dotenv')
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
// sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('Now Listening'));
});
