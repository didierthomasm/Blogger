'use strict'
// Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const routes = require('./routes/index');

require('dotenv').config();

const { sequelize } = require('./models/index');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up Express app
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
app.use(morgan('combined'));

app.use(routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

// Sync the server with sequelize and then start the server to begin listening
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