import React from "react";

import Movie from "../Movie/Movie";

import classes from "./MovieList.module.css";

const MovieList = (props) => {
  if (props.children) {
    return <ul className={classes["movie-list"]}>{props.children}</ul>;
  }
  let content = props.movies.map((movie) => {
    return (
      <Movie
        key={movie.id}
        title={movie.title}
        openingText={movie.openingText}
        releaseDate={movie.releaseDate}
      />
    );
  });

  return <ul className={classes["movie-list"]}>{content}</ul>;
};

export default MovieList;
