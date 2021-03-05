/* Import Libraries */
import React, { useEffect } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* Import needed Components & CSS */
import MovieListItem from '../MovieListItem/MovieListItem';
import './MovieList.css';

/**
 * Function renders a list of movie posters to the DOM.
 *
 * Users can drill into movie details by clicking on a
 * movie poster
 */
function MovieList() {
  const dispatch = useDispatch();

  /* Grab movie data from Redux store */
  const movies = useSelector((store) => store.movies);

  /* Refresh list of movie posters on page load */
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <Link to="/addMovie">Add Movie</Link>
      {/* Display each movie's title and poster */}
      <section className="movies">
        {movies.map((movie) => {
          return <MovieListItem key={movie.id} movie={movie} />;
        })}
      </section>
    </main>
  );
}

export default MovieList;
