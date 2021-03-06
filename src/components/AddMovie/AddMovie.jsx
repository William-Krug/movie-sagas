/* Import Libraries */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddMovie() {
  const dispatch = useDispatch();

  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieGenre, setMovieGenre] = useState('');

  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES',
    });
  }, []);

  const addMovie = (event) => {
    event.preventDefault();
    console.log('*** <AddMovie /> in addMovie() ***');
  };

  return (
    <section>
      <form onSubmit={addMovie}>
        <div>
          <label for="movieTitle">Title</label>
          <input
            type="text"
            name="movieTitle"
            id="movieTitle"
            value={movieTitle}
            placeholder="Fight Club"
            onChange={(event) => setMovieTitle(event.target.value)}
          />
        </div>

        <div>
          <label for="moviePoster">Poster URL</label>
          <input
            type="text"
            name="moviePoster"
            id="moviePoster"
            value={moviePoster}
            placeholder="https://www..."
            onChange={(event) => setMoviePoster(event.target.value)}
          />
        </div>

        <div>
          <label for="movieDescription">Description</label>
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

        <div>
          <label for="movieGenre">Genre</label>
          <select
            name="movieGenre"
            id="movieGenre"
            value={movieGenre}
            onChange={(event) => setMovieGenre(event.target.value)}
          >
            <option value="">Select a Genre</option>
            {genres.map((genre) => {
              return <option value={genre.id}>{genre.name}</option>;
            })}
          </select>
        </div>
        <button>Add Movie</button>
      </form>
    </section>
  );
}

export default AddMovie;
