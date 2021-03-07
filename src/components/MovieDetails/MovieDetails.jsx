/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
  const history = useHistory();
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

  /* Function captures movie details to be populated on
     edit movie page */
  const editMovie = () => {
    // Breadcrumbs for testing and debugging
    if (verbose) {
      console.log('*** <MovieDetails /> in editMovie() ***');
    }

    // Store the movie to be edited in the <EditMovie /> component in the Redux store
    dispatch({
      type: 'EDIT_MOVIE',
      payload: movieId,
    });

    // Navigate to `/editMovie` page
    history.push('/editMovie');
  };

  return (
    <section className="movie">
      {/* Movie poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="details-poster-size"
      />

      {/* Movie title and description */}
      <section>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </section>

      {/* Movie genre(s) */}
      <section>
        <span>
          <h4>Genres: </h4>
        </span>
        <span>
          {movie.genres.map((genre) => {
            return (
              <span>
                <p>{genre + ',  '}</p>
              </span>
            );
          })}
        </span>
      </section>

      {/* Button (link) to edit page */}
      <button className="edit-button" onClick={editMovie}>
        Edit
      </button>
    </section>
  );
}

export default MovieDetails;
