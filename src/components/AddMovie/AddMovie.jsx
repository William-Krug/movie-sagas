/* Import Libraries */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Function allows a user to add their own movie to the database
 *
 * @param {boolean} verbose  global variable used for testing and debugging
 */
function AddMovie({ verbose }) {
  const history = useHistory();
  const dispatch = useDispatch();

  /* Local state variables used for capturing form input */
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieGenre, setMovieGenre] = useState('');

  /* Grab list of possible movie genres from Redux store */
  const genres = useSelector((store) => store.genres);

  /* Load movie genres list */
  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES',
    });
  }, []);

  /* Breadcrumbs for testing and debugging */
  if (verbose) {
    console.log('*** in <AddMovie />');
  }

  /* Function captures form input values and sends data to
     the database to be stored in the "movies" table */
  const addMovie = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Breadcrumbs for testing and debugging
    if (verbose) {
      console.log('*** <AddMovie /> in addMovie() ***');
    }

    // Ping saga to add movie object to the database
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title: movieTitle,
        poster: moviePoster,
        description: movieDescription,
        genre_id: movieGenre,
      },
    });

    // Navigate to movie list page
    history.push('/');
  };

  return (
    <section>
      {/* Add movie form */}
      <form onSubmit={addMovie}>
        {/* Movie Title */}
        <div>
          <label htmlFor="movieTitle">Title</label>
          <input
            type="text"
            name="movieTitle"
            id="movieTitle"
            value={movieTitle}
            placeholder="Fight Club"
            onChange={(event) => setMovieTitle(event.target.value)}
          />
        </div>

        {/* Movie Poster */}
        <div>
          <label htmlFor="moviePoster">Poster URL</label>
          <input
            type="text"
            name="moviePoster"
            id="moviePoster"
            value={moviePoster}
            placeholder="https://www..."
            onChange={(event) => setMoviePoster(event.target.value)}
          />
        </div>

        {/* Movie Description */}
        <div>
          <label htmlFor="movieDescription">Description</label>
          <textarea
            name="movieDescription"
            id="movieDescription"
            value={movieDescription}
            placeholder="An insomniac office worker and a devil-may-care soapmaker..."
            rows="10"
            cols="50"
            onChange={(event) => setMovieDescription(event.target.value)}
          ></textarea>
        </div>

        {/* Movie Genre */}
        <div>
          <label htmlFor="movieGenre">Genre</label>
          <select
            name="movieGenre"
            id="movieGenre"
            value={movieGenre}
            onChange={(event) => setMovieGenre(event.target.value)}
          >
            <option value="">Select a Genre</option>
            {genres.map((genre, i) => {
              return (
                <option key={i} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>
        <button>Save</button>
      </form>

      {/* Button (link) to cancel adding a new movie
          Takes user back to movie list page */}
      <Link to="/">Cancel</Link>
    </section>
  );
}

export default AddMovie;
