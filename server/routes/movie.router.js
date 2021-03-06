const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for `/api/movie`
 *
 * Returns a list of all movies from the "movies" table in the database
 */
router.get('/', (req, res) => {
  // Breadcrumbs for testing and debugging
  console.log('*** Router -> in GET /api/movie ***');

  // SQL query/transaction
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;

  // Query database
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

/**
 * GET route for `/api/movie/:id`
 *
 * Returns a single record (movie) from the database
 * Record looks like:
 * {
 *  id: 1   -- number
 *  title: Avatar   -- string
 *  poster: images/avatar.jpeg    -- string (url to movie poster)
 *  description: Avatar is a...   -- string
 *  genres: [Adventure, Biographical, Comedy]   -- array
 * }
 */
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  // Breadcrumbs for testing and debugging
  console.log('*** Router -> in GET /api/movie/:id ***');
  console.log('\tmovieId:', movieId);

  // SQL query/transaction
  const sqlQuery = `
    SELECT "movies".id, "movies".title, "movies".poster, "movies".description, JSON_AGG("genres".name) as "genres"
    FROM "movies"
    JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
    JOIN "genres" ON "genres".id = "movies_genres".genre_id
    WHERE "movies".id = $1
    GROUP BY "movies".id
  `;

  // Query database
  pool
    .query(sqlQuery, [movieId])
    .then((dbResponse) => {
      // Breadcrumbs for testing and debugging
      // console.log('Movie Obtained');
      // console.log('dbResponse:', dbResponse);

      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(`*** Error making db query ${sqlQuery} ***`, error);
      res.sendStatus(500);
    });
});

/**
 * POST route for `/api/movie`
 *
 * Adds a movie to the database
 *
 * req.body looks like:
 * {
 *  title: Fight Club   -- string
 *  poster: https://www...    -- string (url)
 *  description: An insomniac office worker and a devil-may-care soapmaker..    -- string
 *  genre_id: Drama    -- string
 * }
 */
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";
  `;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      // Breadcrumbs for testing and debugging
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Breadcrumbs for testing and debugging
      // console.log('*** Router -> in POST /api/movie/ ***');
      // console.log('First `then` passed');
      // console.log('createdMovieId:', createdMovieId);

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          // Breadcrumbs for testing and debugging
          // console.log('*** Router -> in POST /api/movie/ ***');
          // console.log('Second `then` passed');

          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
