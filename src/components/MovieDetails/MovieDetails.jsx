/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Function renders the passed movie's poster, title,
 * and description on page load
 *
 * movie object looks like:
 * {
 *  id: 1   -- number
 *  title: Avatar   -- string
 *  poster: images/avatar.jpeg    -- string (url to movie poster)
 *  description: Avatar is a...   -- string
 *  genres: [Adventure, Biographical, Comedy]   -- array
 * }
 *
 * @param {boolean} verbose  global variable used for testing and debugging
 */
function MovieDetails({ verbose }) {
  const dispatch = useDispatch();
  const params = useParams();
  const movieId = params;

  /* Grab movie data from Redux store */
  const movie = useSelector((store) => store.movie);

  /* Breadcrumbs for testing and debugging */
  if (verbose) {
    console.log('*** in <MovieDetails /> ***');
    console.log('\tparams:', params);
  }

  /* Load movie details */
  useEffect(() => {
    dispatch({
      type: 'GET_MOVIE',
      payload: movieId,
    });
  }, []);

  return (
    <section className="movie">
      {/* Movie poster */}
      <img src={movie.poster} alt={movie.title} />

      {/* Movie title and description */}
      <section>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </section>

      {/* Movie genre(s) */}
      <section>
        <span>
          <h4>Genres:</h4>
        </span>
        <span>
          {movie.genres.map((genre) => {
            return genre + ',  ';
          })}
        </span>
      </section>
    </section>
  );
}

export default MovieDetails;
