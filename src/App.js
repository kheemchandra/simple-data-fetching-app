import React, { Fragment } from 'react';
import FetchMovies from './components/FetchMovies/FetchMovies';
import MovieList from './components/Movies/MovieList/MovieList';

function App() {
  return (
    <Fragment>
      <FetchMovies />
      <MovieList />
    </Fragment>
  );
}

export default App;
