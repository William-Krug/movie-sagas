/* Import Libraries */
import { useParams } from 'react-router-dom';

/**
 * Function
 */
function MovieDetails() {
  const params = useParams();
  console.log('*** in <MovieDetails /> ***');
  console.log('\tparams:', params);
  // console.log('\tmovie.id:', movie.id);

  return <h2>In Movie Details</h2>;
}

export default MovieDetails;
