const express = require("express");
const hbs = require("hbs"); //it's just like "ejs" use to render template
const path = require("path");
const friendRouter = require("./router/friends.router");
const messagerouter = require("./router/message.router");
const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //its how you render your template
app.use("/static", express.static(path.join(__dirname, "public"))); //it's where you save your static file
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.baseUrl} ${req.url} your ip is`, req.ip);
  next();
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "my Friends from everest",
  });
});
app.use("/friends", friendRouter);
app.use("/message", messagerouter);

app.listen(3000, () => {
  console.log("port run att 3000");
});
