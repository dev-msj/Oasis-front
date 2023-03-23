import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import GoodWord from './home/GoodWord';
import Login from './login/Login';
import MyWord from './user/MyWord';

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "98vh", background: "#000000", overflow: "scroll" }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/good-word' element={<GoodWord />} />
          <Route path='/my-word' element={<MyWord />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
