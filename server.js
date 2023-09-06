'use strict'
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');

require('dotenv').config();

const { sequelize } = require('./models/index');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ defaultLayout: 'main' });


// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { /*secure: true*/ },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore( {
    db: sequelize
  })
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const init = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}!`);
    });
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

init();