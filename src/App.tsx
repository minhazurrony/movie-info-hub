import { Input, Layout } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Loader } from './components/Loader';
import { TrendingMovies } from './components/TrendingMovies';
import { TrendingTvSeries } from './components/TrendingTv';
import { UpcomingMovies } from './components/UpcomingMovies';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingTvSeries, setTrendingTvSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/movie/upcoming?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9&language=en-US&page=1`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setUpcomingMovies(res.data.results);
      setLoading(false);
    };

    const fetchTrendingMovies = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/trending/movie/week?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setTrendingMovies(res.data.results);
      setLoading(false);
    };

    const fetchTrendingTvSeries = async () => {
      const trendingAPI = `https://api.themoviedb.org/3/trending/tv/week?api_key=dbfb4b6d3ceaae796d00053aa80dc1d9`;
      setLoading(true);
      const res = await axios.get(trendingAPI);
      setTrendingTvSeries(res.data.results);
      setLoading(false);
    };

    fetchUpcomingMovies();
    fetchTrendingMovies();
    fetchTrendingTvSeries();
  }, []);

  return (
    <Layout>
      <Header className="app-header">
        <div className="header-container">
          <img src={require('./assets/logo.png')} alt="logo" height={30} />
          <Search
            style={{ width: 200 }}
            enterButton
            placeholder="search movie"
            onSearch={(value) => console.log(value)}
          />
        </div>
      </Header>
      <Content className="main-content-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <UpcomingMovies upcomingMovies={upcomingMovies} />
            <TrendingMovies trendingMovies={trendingMovies} />
            <TrendingTvSeries trendingTvSeries={trendingTvSeries} />
          </>
        )}
      </Content>
      <Footer className="app-footer">
        <p>Build with TMDB api</p>
      </Footer>
    </Layout>
  );
};

export default App;
