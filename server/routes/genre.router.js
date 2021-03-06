const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const sqlQuery = `
    SELECT * FROM "genres"
    ORDER BY "name" ASC;
  `;

  pool
    .query(sqlQuery)
    .then((dbResponse) => {
      console.log('Genres Obtained');
      console.log('dbResponse:', dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(
        `!!! Error making db query ${sqlQuery} to /api/genre !!!`,
        error
      );
      res.sendStatus(500);
    });
});

module.exports = router;
