const express = require("express");
const app = express();
const PORT = 5000;
const fs = require("fs");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

// GET:
//      /movies
//      /movies/:id

//      /users
//      /users/:id

// app.get("/movies", (req, res) => {
//   res.status(200).send(handler.getMovies(req.query));
// });
app.get("/movies", (req, res) => {
  fs.readFile("./data/movies.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const movies = JSON.parse(data);
    res.status(200).send(movies);
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

app.get("/users", (req, res) => {
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    res.status(200).send(users);
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
