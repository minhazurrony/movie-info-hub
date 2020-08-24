import { Col, Pagination, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { MovieCard } from '../MovieCard';
import './trendingMovies.css';

interface TrendingMoviesProps {
  trendingMovies: Array<any>;
}

export const TrendingMovies = ({ trendingMovies }: TrendingMoviesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [showMovieDetailsModal, setShowMovieDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  // Get current movie
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovie = trendingMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  return (
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
            hideOnSinglePage={true}
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
  );
};
