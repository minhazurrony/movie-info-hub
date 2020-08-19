import { Col, Pagination, Row } from 'antd';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { InfoModal } from '../InfoModal';
import { Loader } from '../Loader';
import { MovieCard } from '../MovieCard';
import './trendingTv.css';

export const TrendingTV = () => {
  const [trendingTV, setTrendingTV] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [showTvSeriesDetailModal, setShowTvSeriesDetailModal] = useState(false);
  const [selectedTvSeries, setSelectedTvSeries] = useState('');

  useEffect(() => {
    const fetchTrendingTV = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/trending/tv/week?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setTrendingTV(res.data.results);
      setLoading(false);
    };

    fetchTrendingTV();
  }, []);

  // Get current movie
  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentMovie = trendingTV.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="tvSeriesTitle">Trending TV Series</h1>

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
                total={trendingTV.length}
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
      )}
    </>
  );
};
