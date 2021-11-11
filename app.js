const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

//hold all of the todo items
let toDoItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {

  let options = { weekday: 'long', day: 'numeric', month: 'long'};
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);

  //send the day and the todoitems
  res.render("list", {kindOfDay: day, newToDoItems: toDoItems});
});

//handle post requests from the form on the page
app.post("/", (req, res) => {
  let item = req.body.newItem;
//push new items into the todoitems array
  toDoItems.push(item);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
