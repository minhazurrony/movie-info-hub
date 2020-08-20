import { Col, Pagination, Row } from 'antd';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { Loader } from '../Loader';
import { MovieCard } from '../MovieCard';
import './upcomingMovies.css';

export const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [showMovieDetailsModal, setShowMovieDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/movie/upcoming?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9&language=en-US&page=1`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setUpcomingMovies(res.data.results);
      setLoading(false);
    };

    fetchUpcomingMovies();
  }, []);

  // Get current movie
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = upcomingMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="upcomingMovieTitle">Coming Soon</h1>

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
                total={upcomingMovies.length}
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
