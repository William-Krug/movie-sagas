/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Import CSS */
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

  const goToDetails = () => {
    console.log('*** in goToDetails() ***');
  };

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} onClick={goToDetails} />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
