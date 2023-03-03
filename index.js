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
    if (!filteredMovies) {
      res.status(404).send([]);
    }
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
    if (!filteredUsers) {
      res.status(404).send([]);
    }
    res.status(200).send(filteredUsers);
  });
});

app.get("/thumbnails", (req, res) => {
  fs.readFile("./data/thumbnails.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const thumbnails = JSON.parse(data);
    if (!req.query.ids) {
      res.status(200).send(thumbnails);
      return;
    }
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    const filteredThumbnails = thumbnails.filter((thumbnail) =>
      ids.includes(thumbnail.id)
    );
    if (!filteredThumbnails) {
      res.status(404).send([]);
    }
    res.status(200).send(filteredThumbnails);
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
    if (!movie) {
      res.status(404).send({});
    }
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
    if (!user) {
      res.status(404).send({});
    }
    res.status(200).send(user);
  });
});

app.get("/thumbnails/:id", (req, res) => {
  fs.readFile("./data/thumbnails.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const thumbnails = JSON.parse(data);
    const thumbnail = thumbnails.find(
      (thumbnail) => thumbnail.id === parseInt(req.params.id)
    );
    if (!thumbnail) {
      res.status(404).send({});
    }
    res.status(200).send(thumbnail);
  });
});

module.exports = app;
