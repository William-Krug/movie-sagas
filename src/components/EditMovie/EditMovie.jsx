/* Import Libraries */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * Function renders the passed movie's details so that
 * they can be displayed for editing
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
function EditMovie({ verbose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  /* Grab data from Redux store */
  const movie = useSelector((store) => store.movie);
  const genres = useSelector((store) => store.genres);

  /* Local state variables used for capturing form input */
  const [editTitle, setEditTitle] = useState(movie.title);
  const [editPoster, setEditPoster] = useState(movie.poster);
  const [editDescription, setEditDescription] = useState(movie.description);
  const [editGenre, setEditGenre] = useState(movie.genre);

  /* Breadcrumbs for testing and debugging */
  if (verbose) {
    console.log('*** in <EditMovie />');
  }

  const updateMovie = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Breadcrumbs for testing and debugging
    if (verbose) {
      console.log('*** <EditMovie /> in updateMovie() ***');
    }

    // Ping saga to update movie object in database
    dispatch({
      type: 'UPDATE_MOVIE',
      payload: {
        id: movie.id,
        title: editTitle,
        poster: editPoster,
        description: editDescription,
        genre_id: editGenre,
      },
    });

    // Navigate to movie list page
    history.push('/');
  };

  return (
    <section>
      <h2>Edit Movie</h2>
      <img src={movie.poster} alt={movie.title} />
      <form onSubmit={updateMovie}>
        {/* Movie Title */}
        <div>
          <label htmlFor="movieTitle">Title</label>
          <input
            type="text"
            name="movieTitle"
            id="movieTitle"
            value={editTitle}
            // placeholder="Fight Club"
            onChange={(event) => setEditTitle(event.target.value)}
          />
        </div>

        {/* Movie Poster */}
        {/* <div>
          <label htmlFor="moviePoster">Poster URL</label>
          <input
            type="text"
            name="moviePoster"
            id="moviePoster"
            value={editPoster}
            // placeholder="https://www..."
            onChange={(event) => setEditPoster(event.target.value)}
          />
        </div> */}

        {/* Movie Description */}
        <div>
          <label htmlFor="movieDescription">Description</label>
          <textarea
            name="movieDescription"
            id="movieDescription"
            value={editDescription}
            // placeholder="An insomniac office worker and a devil-may-care soapmaker..."
            rows="10"
            cols="50"
            onChange={(event) => setEditDescription(event.target.value)}
          ></textarea>
        </div>

        {/* Movie Genre */}
        {/* <div>
          <label htmlFor="movieGenre">Genre</label>
          <select
            name="movieGenre"
            id="movieGenre"
            value={editGenre}
            onChange={(event) => setEditGenre(event.target.value)}
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
        </div> */}
        <button>Save</button>
      </form>
    </section>
  );
}

export default EditMovie;
