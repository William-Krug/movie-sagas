/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Import needed Components & CSS */
import MovieListItem from '../MovieListItem/MovieListItem';
import './MovieList.css';

/**
 * Function renders a list of movie posters to the DOM.
 *
 * Users can drill into movie details by clicking on a
 * movie poster
 *
 * @param {boolean} verbose  global variable used for testing and debugging
 */
function MovieList({ verbose }) {
  const dispatch = useDispatch();

  /* Grab movie data from Redux store */
  const movies = useSelector((store) => store.movies);

  /* Refresh list of movie posters on page load */
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  /* Breadcrumbs for testing and debugging */
  if (verbose) {
    console.log('*** in <MovieList /> ***');
  }

  return (
    <main>
      <h2>MovieList</h2>

      {/* Display each movie's title and poster */}
      <section className="movies">
        {movies.map((movie) => {
          return (
            <MovieListItem key={movie.id} movie={movie} verbose={verbose} />
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
