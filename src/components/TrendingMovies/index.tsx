import { Col, Pagination, Row } from 'antd';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { MovieCard } from '../MovieCard';
import './trendingMovies.css';

export const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/trending/movie/week?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setTrendingMovies(res.data.results);
      setLoading(false);
    };

    fetchTrendingMovies();
  }, []);

  // Get current movie
  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentMovie = trendingMovies.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="trendingMovieTitle">Trending Movies</h1>

          <Row gutter={[16, 16]}>
            {currentMovie.map((item) => (
              <Fragment key={item.id}>
                <Col md={{ span: 8 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                  <MovieCard
                    imageSource={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    imageAlerText={item.title}
                    movieTitle={item.title}
                    releaseYear={item.release_date}
                    averageRating={item.vote_average}
                  />
                </Col>
              </Fragment>
            ))}
          </Row>

          <Row>
            <Col span={24}>
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                defaultPageSize={moviesPerPage}
                total={trendingMovies.length}
                onChange={(page) => setCurrentPage(page)}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
