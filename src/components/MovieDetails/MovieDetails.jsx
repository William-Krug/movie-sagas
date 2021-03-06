/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * Function renders the passed movie's poster, title,
 * and description on page load
 */
function MovieDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const movieId = params;

  /* Grab movie data from Redux store */
  const movie = useSelector((store) => store.movie);

  // Breadcrumbs for testing and debugging
  console.log('*** in <MovieDetails /> ***');
  console.log('\tparams:', params);

  /* Load movie details */
  useEffect(() => {
    dispatch({
      type: 'GET_MOVIE',
      payload: movieId,
    });
  }, []);

  return (
    <section className="movie">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <section>
        <h4>Genres:</h4>{' '}
        <span>
          {movie.genres.map((genre, i) => {
            return genre + '  ';
          })}
        </span>
      </section>
    </section>
  );
}

export default MovieDetails;
