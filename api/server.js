const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
//voleyball
const db = require("./db");
const envs = require("./config/envs");

const models = require("./models")
const routes = require("./routes")

app.use(express.json());
app.use(cookieParser());
// app.use(volleyball);
app.use("/api", routes);

db.sync({ force: false }).then(() => {
    app.listen(3001, () => {
      console.log("server levantado en puerto 3001");
    });
});