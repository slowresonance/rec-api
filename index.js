const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");

const cors = require("cors");

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

// GET:
//      /movies
//      /movies/:id

//      /users
//      /users/:id

// get multiple movies with ids in query string
app.get("/movies", (req, res) => {
  fs.readFile("./data/movies.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const movies = JSON.parse(data);
    if (!req.query.ids) {
      res.status(200).send(movies);
      return;
    }
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    const filteredMovies = movies.filter((movie) => ids.includes(movie.id));
    res.status(200).send(filteredMovies);
  });
});

// get multiple users with ids in query string
app.get("/users", (req, res) => {
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    if (!req.query.ids) {
      res.status(200).send(users);
      return;
    }
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    const filteredUsers = users.filter((user) => ids.includes(user.id));
    res.status(200).send(filteredUsers);
  });
});

app.get("/movies/:id", (req, res) => {
  fs.readFile("./data/movies.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const movies = JSON.parse(data);
    const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
    res.status(200).send(movie);
  });
});

app.get("/users/:id", (req, res) => {
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((user) => user.id === parseInt(req.params.id));
    res.status(200).send(user);
  });
});

module.exports = app;
