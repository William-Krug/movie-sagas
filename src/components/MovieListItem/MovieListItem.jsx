/* Import Libraries */
import { useHistory } from 'react-router-dom';

/**
 * Function renders passed movie title and poster image to DOM
 *
 * movie object looks like:
 * {
 *  id: 1   -- number
 *  title: Avatar   -- string
 *  poster: images/avatar.jpeg    -- string (url to movie poster)
 *  description: Avatar is a...   -- string
 *  genres: [Adventure, Biographical, Comedy]   -- array
 * }
 * @param {object} movie  details pertaining to the specific movie passed
 * @param {boolean} verbose  global variable used for testing and debugging
 */
function MovieListItem({ movie, verbose }) {
  const history = useHistory();

  /* Breadcrumbs for testing and debugging */
  if (verbose) {
    console.log('*** in <MovieListItem /> ***');
  }

  /* Takes user to a `/details` page about the movie when
     the associated movie poster is clicked on */
  const goToDetails = () => {
    // Breadcrumbs for testing and debugging
    if (verbose) {
      console.log('*** <MovieListItem /> in goToDetails() ***');
      console.log('\tmovie:', movie);
    }

    // Navigate to `/details` page for selected movie
    history.push(`/details/${movie.id}`);
  };

  return (
    <div className="movie-details">
      {/* Render movie title and poster */}
      <h3 className="movie-title">{movie.title}</h3>
      <img
        src={movie.poster}
        alt={movie.title}
        className="poster-size"
        onClick={goToDetails}
      />
    </div>
  );
}

export default MovieListItem;
