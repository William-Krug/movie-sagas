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

  return <h2>In Movie Details</h2>;
}

export default MovieDetails;
