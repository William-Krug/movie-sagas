/* Import Libraries */
import { useHistory } from 'react-router-dom';

/**
 * Function renders movie title and poster image to DOM
 *
 * movie object looks like:
 * {
 *  id: 1   -- number
 *  title: Avatar   -- string
 *  poster: images/avatar.jpeg    -- string (url to movie poster)
 *  description: Avatar is a...   -- string
 * }
 * @param {object} movie  details pertaining to the specific movie passed
 */
function MovieListItem({ movie }) {
  const history = useHistory();

  /* Takes user to a `/details` page about the movie when
     the associated movie poster is clicked on */
  const goToDetails = () => {
    // Breadcrumbs for testing and debugging
    console.log('*** in goToDetails() ***');
    console.log('\tmovie:', movie);
    // <Link to=`/details/&{}` />;
    history.push(`/details/${movie.id}`);
  };

  return (
    <div>
      {/* Render movie title and poster */}
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} onClick={goToDetails} />
    </div>
  );
}

export default MovieListItem;
