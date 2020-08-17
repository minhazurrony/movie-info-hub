import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);

  useEffect(() => {
    const trendingAPI = `https://api.themoviedb.org/3/trending/movie/week?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9`;

    axios
      .get(trendingAPI)
      .then((response) => setTrendingMovies(response.data.results));
  }, []);

  const trendingMovieList = trendingMovies.map((item) => {
    return (
      <Fragment key={item.id}>
        <img
          key={item.poster_path}
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt="movie_poster"
        />
        <li key={item.title}>{item.title}</li>
      </Fragment>
    );
  });
  return <ul>{trendingMovieList}</ul>;
};

export default App;
