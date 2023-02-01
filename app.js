const express = require("express");
const app = express();
const port = 5000;

// convert requests into json
app.use(express.json());

// static files
app.use(express.static("public"));

// set views
app.set("views", "./views");
app.set("view engine", "ejs");
const homeRoute = require("./routes/HomeRoute.js");
const artsRoute = require('./routes/HealthRoute');
const scienceRoute = require('./routes/ScienceRoute')
const politicsRoute = require('./routes/PoliticsRoute')
const sportsRoute = require('./routes/SportsRoute');
const searchRoute = require('./routes/SearchRoute');
const advancedSearchRoute = require('./routes/AdvancedSearchRoute');
app.use(advancedSearchRoute);
app.use(searchRoute);
app.use(homeRoute);
app.use(artsRoute);
app.use(scienceRoute);
app.use(politicsRoute);
app.use(sportsRoute);
// set server
app.listen(port, () => {
  console.log("server starting");
});
