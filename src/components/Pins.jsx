import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Searchbar from './Searchbar';
import Feed from './Feed';
import PinDetail from './PinDetail';
import CreatePin from './CreatePin';
import ProtectedRoutes from '../ProtectedRoutes';

const Pins = () => {
  return (
    <div>
      <div className="hidden sm:block">
        <Searchbar />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-details/:pinId" element={<PinDetail />} />
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/*" element={<CreatePin />} />
          </Route>
          <Route path="/search" element={<Feed />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
