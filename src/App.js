import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "98vh", background: "#000000", overflow: "scroll" }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
