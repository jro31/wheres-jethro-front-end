// TODO - Update readme

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MapPage from './routes/MapPage';

const AddCheckIn = React.lazy(() => import('./routes/AddCheckIn'));

const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path='/' element={<MapPage />} />
        <Route path='check-in' element={<AddCheckIn />} />
      </Routes>
    </Suspense>
  );
};

export default App;
