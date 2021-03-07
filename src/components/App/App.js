/* Import Libraries */
import { HashRouter as Router, Link, Route } from 'react-router-dom';

/* Import needed Components & CSS */
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import EditMovie from '../EditMovie/EditMovie';
import './App.css';

// Global variable used for testing and debugging
const verbose = true;

function App() {
  return (
    <div className="App">
      <Router>
        {/* Header (present on all pages) */}
        <Header verbose={verbose} />

        <Route path="/" exact>
          <MovieList verbose={verbose} />
        </Route>

        {/* Details page */}
        <Route exact path="/details/:id">
          <MovieDetails verbose={verbose} />
        </Route>

        {/* Add Movie page */}
        <Route exact path="/addMovie">
          <AddMovie verbose={verbose} />
        </Route>

        {/* Edit Movie page */}
        <Route exact path="/editMovie">
          <EditMovie verbose={verbose} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
