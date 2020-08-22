import { Col, Pagination, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { MovieCard } from '../MovieCard';
import './trendingTv.css';

interface TrendingTvSeriesProps {
  trendingTvSeries: Array<any>;
}

export const TrendingTvSeries = ({
  trendingTvSeries,
}: TrendingTvSeriesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [showTvSeriesDetailModal, setShowTvSeriesDetailModal] = useState(false);
  const [selectedTvSeries, setSelectedTvSeries] = useState('');

  // Get current tv series
  const indexOfLastTvSeries = currentPage * moviesPerPage;
  const indexOfFirstTvSeries = indexOfLastTvSeries - moviesPerPage;
  const currentTvSeries = trendingTvSeries.slice(
    indexOfFirstTvSeries,
    indexOfLastTvSeries,
  );

  return (
    <>
      <h1 className="tvSeriesTitle">Trending TV Series</h1>

      <Row gutter={[16, 16]}>
        {currentTvSeries.map((item) => (
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
                  setShowTvSeriesDetailModal(true);
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
            total={trendingTvSeries.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>

      <InfoModal
        isVisible={showTvSeriesDetailModal}
        handleOk={(e) => setShowTvSeriesDetailModal(false)}
        detailsInfo={selectedTvSeries}
        handleClose={(e) => setShowTvSeriesDetailModal(false)}
        isFromMovie={false}
      />
    </>
  );
};
