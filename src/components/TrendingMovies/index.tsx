import { Col, Pagination, Row } from 'antd';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { Loader } from '../Loader';
import { MovieCard } from '../MovieCard';
import './trendingMovies.css';

export const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [showMovieDetailsModal, setShowMovieDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = trendingMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  // console.log(trendingMovies);
  console.log('selected Movie', selectedItem);

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
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 4 }}
                  xl={{ span: 4 }}
                >
                  <MovieCard
                    imageSource={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    imageAlerText={item.title}
                    movieTitle={item.title}
                    releaseYear={item.release_date}
                    averageRating={item.vote_average}
                    handleCardClick={() => {
                      setSelectedItem(item);
                      setShowMovieDetailsModal(true);
                    }}
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

          <InfoModal
            isVisible={showMovieDetailsModal}
            handleOk={(e) => setShowMovieDetailsModal(false)}
            detailsInfo={selectedItem}
            handleClose={(e) => setShowMovieDetailsModal(false)}
            isFromMovie={true}
          />
        </>
      )}
    </>
  );
};
