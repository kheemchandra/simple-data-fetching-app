import React, { useRef } from "react";
import Button from "../UI/Button/Button";

import classes from "./AddMovie.module.css";

const AddMovie = (props) => {
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const addMovieHandler = async (event) => {
    event.preventDefault();
    let title = titleRef.current.value;
    let openingText = openingTextRef.current.value;
    let releaseDate = releaseDateRef.current.value;
    try {
      const response = await fetch(
        "https://films-fetch-default-rtdb.firebaseio.com/films.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            title: title,
            openingText: openingText,
            releaseDate: releaseDate,
          }),
        }
      );

      if (response.status === 200) {
        props.onFetch();
      } 
    } catch (error) {
      console.log('Failed to post data');
      return;
    }

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <form onSubmit={addMovieHandler} className={classes.form}>
      <div>
        <label htmlFor="title">Title</label>
        <input ref={titleRef} id="title" type="text" required />
      </div>
      <div>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea ref={openingTextRef} id="opening-text" rows="5" required />
      </div>
      <div>
        <label htmlFor="release-date">Release Date</label>
        <input ref={releaseDateRef} id="release-date" type="date" required />
      </div>
      <Button type="submit">Add Movie</Button>
    </form>
  );
};

export default AddMovie;
