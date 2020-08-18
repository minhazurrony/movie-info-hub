import { Layout } from 'antd';
import React from 'react';
import './App.css';
import { TrendingMovies } from './components/TrendingMovies';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          Header
        </Header>
        <Content
          style={{
            paddingLeft: '50px',
            paddingRight: '50px',
            marginTop: '95px',
          }}
        >
          <TrendingMovies />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default App;
