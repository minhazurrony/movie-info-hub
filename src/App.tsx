import { Layout } from 'antd';
import React from 'react';
import './App.css';
import { TrendingMovies } from './components/TrendingMovies';
import { TrendingTV } from './components/TrendingTv';
import { UpcomingMovies } from './components/UpcomingMovies';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Header
          style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        ></Header>
        <Content
          style={{
            paddingLeft: '50px',
            paddingRight: '50px',
            marginTop: '95px',
          }}
        >
          <UpcomingMovies />
          <TrendingMovies />
          <TrendingTV />
        </Content>
        <Footer className="app-footer">
          <p>Build with TMDB</p>
        </Footer>
      </Layout>
    </>
  );
};

export default App;
