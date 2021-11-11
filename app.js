const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

//hold all of the todo items
var toDoItems = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {

  var options = { weekday: 'long', day: 'numeric', month: 'long'};
  var today = new Date();
  var day = today.toLocaleDateString("en-US", options);

  //send the day and the todoitems
  res.render("list", {kindOfDay: day, newToDoItems: toDoItems});
});

//handle post requests from the form on the page
app.post("/", (req, res) => {
  var item = req.body.newItem;
//push new items into the todoitems array
  toDoItems.push(item);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
