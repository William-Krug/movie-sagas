/* Import Libraries */
import { HashRouter as Router, Link, Route } from 'react-router-dom';

/* Import needed Components & CSS */
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import './App.css';

const verbose = true;

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <nav>
          <Link to="/">Movie List</Link>
          <Link to="/addMovie">Add Movie</Link>
        </nav>
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
      </Router>
    </div>
  );
}

export default App;
