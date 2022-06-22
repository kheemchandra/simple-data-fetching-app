import React from 'react';

import classes from './Movie.module.css';

const Movie = props => {
  return <li className={classes.movie}>
    <h1>{props.title}</h1>
    <h3>{props.releaseDate}</h3>
    <p>{props.openingText}</p>
  </li>
};

export default Movie;