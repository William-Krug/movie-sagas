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
}

/**
 *
 * @param {object} action
 */
function* addMovie(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> addMovie() ***');
  console.log('action.payload:', action.payload);

  try {
    yield axios.post('/api/movie', action.payload);

    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    alert('An ERROR occurred during query. Please try again later.');
    console.log('!!! addMovie() ERROR POST /api/movie');
  }
}

function* fetchAllMovies(action) {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    console.log('get all error');
  }
}

function* fetchGenres(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga -> in fetchGenres() ***');

  try {
    const genres = yield axios.get('/api/genre');
    yield put({
      type: 'SET_GENRES',
      payload: genres.data,
    });
  } catch (error) {
    console.log('!!! fetchGenres ERROR GET /api/genre !!!');
  }
}

/* Gets a specific movie for `/details/:id` page */
function* getMovie(action) {
  // Breadcrumbs for testing and debugging
  console.log('*** Saga --> in getMovie() ***');
  console.log('\taction.payload:', action.payload);
  console.log('\taction.payload.id:', action.payload.id);

  try {
    const movie = yield axios.get(`/api/movie/${action.payload.id}`);
    console.log('*** dbResponse to getMovie() Saga ***');
    console.log('\tmovie:', movie);
    yield put({
      type: 'SET_MOVIE',
      payload: movie.data[0],
    });
  } catch (error) {
    alert('An ERROR occurred during query. Please try again later');
    console.log('Saga -> ERROR in GET `/details/:id`:', error);
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
