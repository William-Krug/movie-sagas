const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for `/api/genre`
 *
 * Returns a list of all genres from the "genres" table
 */
router.get('/', (req, res) => {
  // Breadcrumbs for testing and debugging
  console.log('*** Router -> GET /api/genre ***');

  // SQL query/transaction
  const sqlQuery = `
    SELECT * FROM "genres"
    ORDER BY "name" ASC;
  `;

  // Query database
  pool
    .query(sqlQuery)
    .then((dbResponse) => {
      // Breadcrumbs for testing and debugging
      // console.log('Genres Obtained');
      // console.log('dbResponse:', dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      // Breadcrumbs for testing and debugging
      console.log(
        `!!! Error making db query ${sqlQuery} to /api/genre !!!`,
        error
      );
      res.sendStatus(500);
    });
});

module.exports = router;
