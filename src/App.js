import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import ContentSelector from './footer/ContentSelector';
import OasisHeader from './header/OasisHeader';
import WriteFeed from './feed/WriteFeed';
import Join from './join/Join';
import NotFound from './notFound/NotFound';

const App = () => {  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout>
        <Header style={{backgroundColor: 'black'}}>
          <OasisHeader />
        </Header>
        
        <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh", background: "#000000" }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/write' element={<WriteFeed />} />
            <Route path='/join' element={<Join />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Content>

        <Footer style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#000000" }}>
          <ContentSelector />
        </Footer>
      </Layout>
    </Suspense>
  );
}

export default App;
