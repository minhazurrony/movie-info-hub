import { Col, PageHeader, Pagination, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { MovieCard } from '../MovieCard';
import './searchResults.css';

interface SearchResultsProps {
  searchResults: Array<any>;
  handleBack: () => void;
  currentPaginationValue: number;
  handlePaginationChange: (page: any) => void;
}

export const SearchResults = ({
  searchResults,
  handleBack,
  currentPaginationValue,
  handlePaginationChange,
}: SearchResultsProps) => {
  const [moviesPerPage] = useState(6);
  const [showMovieDetailModal, setShowMovieDetailModal] = useState(false);
  const [selectedTvSeries, setSelectedTvSeries] = useState('');

  // Get current tv series
  const indexOfLastMovies = currentPaginationValue * moviesPerPage;
  const indexOfFirstMovies = indexOfLastMovies - moviesPerPage;
  const currentMovies = searchResults.slice(
    indexOfFirstMovies,
    indexOfLastMovies,
  );

  return (
    <>
      <PageHeader
        onBack={handleBack}
        title="Results"
        subTitle="Showing search results"
      />
      {searchResults.length === 0 ? (
        <div className="message-container">
          <h1>Oops!</h1>
          <p>Nothing found. Enter exact movie title please.</p>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {currentMovies.map((item) => (
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
                    imageAlerText={item.name}
                    movieTitle={item.name}
                    releaseYear={item.release_date}
                    averageRating={item.vote_average}
                    handleCardClick={() => {
                      setSelectedTvSeries(item);
                      setShowMovieDetailModal(true);
                    }}
                  />
                </Col>
              </Fragment>
            ))}
          </Row>

          <Row>
            <Col span={24}>
              <Pagination
                current={currentPaginationValue}
                defaultCurrent={1}
                defaultPageSize={moviesPerPage}
                total={searchResults.length}
                onChange={(page) => handlePaginationChange(page)}
                hideOnSinglePage={true}
              />
            </Col>
          </Row>

          <InfoModal
            isVisible={showMovieDetailModal}
            handleOk={(e) => setShowMovieDetailModal(false)}
            detailsInfo={selectedTvSeries}
            handleClose={(e) => setShowMovieDetailModal(false)}
            isFromMovie={false}
          />
        </>
      )}
    </>
  );
};
