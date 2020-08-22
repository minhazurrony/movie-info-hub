import { Input, Layout } from 'antd';
import React from 'react';
import './App.css';
import { TrendingMovies } from './components/TrendingMovies';
import { TrendingTV } from './components/TrendingTv';
import { UpcomingMovies } from './components/UpcomingMovies';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const App = () => {
  return (
    <>
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
