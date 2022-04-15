const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
//enable handlebars
const exphbs = require("express-handlebars");
//enable helper methods
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

//set up for using sessions
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {
    //cookie expires (user will be logged out) after five minutes
    maxAge: 300000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allow files to be sent as static assets
app.use(express.static(path.join(__dirname, "public")));
//set up to use handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//set up to use express-sessions
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
});
