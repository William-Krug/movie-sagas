/* Import Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

/* Import CSS */
import './index.css';

/* Create the rootSaga generator function */
function* rootSaga() {
  // Add movie to database
  yield takeEvery('ADD_MOVIE', addMovie);

  // Get all genres
  yield takeEvery('FETCH_GENRES', fetchGenres);

  // Get all movies
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);

  // Get single movie details
  yield takeEvery('GET_MOVIE', getMovie);

  //Get updated movie details
  yield takeEvery('UPDATE_MOVIE', updateMovie);
}

/**
 * Function collects the movie object from the DOM and POSTs it to the
 * database to be stored.
 *
 * movie object looks lik:
 * {
 *  title: Fight Club   -- string
 *  poster: https://www...    -- string (url)
 *  description: An insomniac office worker and a devil-may-care soapmaker..    -- string
 *  genre_id: Drama    -- string
 * }
 */
function* addMovie(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> addMovie() ***');
  console.log('action.payload:', action.payload);

  // POST movie to DB
  try {
    yield axios.post('/api/movie', action.payload);

    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    // Breadcrumbs for testing and debugging
    alert('An ERROR occurred during query. Please try again later.');
    console.log('!!! addMovie() ERROR POST /api/movie');
  }
}

/**
 * Function makes a GET request to the database for all movies
 * in the "movies" table
 */
function* fetchAllMovies(action) {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    // Breadcrumbs for testing and debugging
    alert('An ERROR occurred during query. Please try again later.');
    console.log('get all error');
  }
}

/**
 * Function makes a GET request to the database for all genres
 * in the "genres" table
 */
function* fetchGenres(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> in fetchGenres() ***');

  // get all genres from the DB
  try {
    const genres = yield axios.get('/api/genre');
    yield put({
      type: 'SET_GENRES',
      payload: genres.data,
    });
  } catch (error) {
    // Breadcrumbs for testing and debugging
    alert('An ERROR occurred during query. Please try again later.');
    console.log('!!! fetchGenres ERROR GET /api/genre !!!');
  }
}

/**
 * Function GETs a specific movie for the `/details/:id` page
 *
 * All of the selected movie's details from both the "movies"
 * and "movies_genres" table are returned
 */
function* getMovie(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> in getMovie() ***');
  console.log('\taction.payload:', action.payload);
  console.log('\taction.payload.id:', action.payload.id);

  // GET movie details from DB
  try {
    const movie = yield axios.get(`/api/movie/${action.payload.id}`);
    console.log('*** dbResponse to getMovie() Saga ***');
    console.log('\tmovie:', movie);
    yield put({
      type: 'SET_MOVIE',
      payload: movie.data[0],
    });
  } catch (error) {
    // Breadcrumbs for testing and debugging
    alert('An ERROR occurred during query. Please try again later');
    console.log('Saga -> ERROR in GET `/details/:id`:', error);
  }
}

/**
 * Function update's a movie's Title and/or Description via
 * PUT query
 */
function* updateMovie(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> in updateMovie() ***');

  // PUT updated movie details in DB
  try {
    yield axios.put(`/api/movie/${action.payload.id}`, action.payload);
  } catch (error) {
    // Breadcrumbs for testing and debugging
    alert('An ERROR occurred during query. Please try again later');
    console.log('Saga -> ERROR in PUT `/api/movie/:id` :', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store single move returned from the server
const movie = (
  state = {
    id: '',
    title: '',
    poster: '',
    description: '',
    genres: [],
  },
  action
) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    movie,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
