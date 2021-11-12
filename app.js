const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();

//hold all of the todo items
const toDoItems = [];
const workListItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

//render the home page title and toDoItmes array.
app.get("/", (req, res) => {

  const day = date.getDate();

  //render the day and the todoitems
  res.render("list", {listTitle: day, newToDoItems: toDoItems});
});

//handle post requests from the form on the home page
app.post("/", (req, res) => {

//this holds the newItem variable from the html form
  const item = req.body.newItem;

//check to see if the post request is coming from /work or / then handle the request
  if (req.body.list === "Work") {
    workListItems.push(item);
    res.redirect("/work");
  } else {
    toDoItems.push(item);
    res.redirect("/");
  }

});

//render title and newToDoItems array onto the list.ejs page in the /work path
app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newToDoItems: workListItems});
});

app.get("/about", (req, res) => {
  res.render("about");
});


app.listen(port, () => {
  console.log("Server listening on port " + port);
});
