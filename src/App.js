import React, { Fragment, useEffect, useState, useCallback } from "react";
import AddMovie from "./components/AddMovie/AddMovie";
import FetchMovies from "./components/FetchMovies/FetchMovies";
import MovieList from "./components/Movies/MovieList/MovieList";

const DUMMY_MOVIES = [
  {
    id: "m1",
    title: "A New Hope",
    openingText:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    releaseDate: "1977-05-25",
  },
  {
    id: "m2",
    title: "The Empire Strikes Back",
    openingText:
      "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
    releaseDate: "1980-05-17",
  },
  {
    id: "m3",
    title: "Return of the Jedi",
    openingText:
      "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
    releaseDate: "1983-05-25",
  },
];


function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null); 

  
  const fetchMoviesHandler = useCallback(async () => {
    setIsError(null);
    try {
      setIsLoading(true);
      const response = await fetch("https://films-fetch-default-rtdb.firebaseio.com/films.json");
      if(response.status !== 200){
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      const fetchedMovies = []; 
      for(const movie_id in data){
        fetchedMovies.push({
          id: movie_id,
          title: data[movie_id]["title"],
          openingText: data[movie_id]["openingText"],
          releaseDate: data[movie_id]["releaseDate"],
        });
      } 
      setMovies(fetchedMovies); 
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log('Error: ', error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = "";
  if (movies.length === 0) {
    content = "No movies found";
  }
  if (isLoading) {
    content = "Loading...";
  }
  if (isError) {
    content = "Failed to fetch";
  }

  return (
    <Fragment>
      <AddMovie onFetch={fetchMoviesHandler}/>
      <FetchMovies onFetch={fetchMoviesHandler} />
      {content && <MovieList>{content}</MovieList>}
      {!content && <MovieList movies={movies} />}
    </Fragment>
  );
}

export default App;
