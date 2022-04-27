import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar,Pins ,UserProfile} from '../components';

const Explore = () => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-mainBg ml-48 p-2 sm:ml-0">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </>
  );
};

export default Explore;
