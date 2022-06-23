import React from 'react';

import Button from '../UI/Button/Button';

import classes from './FetchMovies.module.css';

const FetchMovies = props => {
  return <div className={classes['fetch-movies']}>
    <Button onClick={props.onFetch}>Fetch Movies</Button>
  </div>
}

export default FetchMovies;