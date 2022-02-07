// TODO - Update favicon
// TODO - Update readme

import { Routes, Route } from 'react-router-dom';

import AddCheckIn from './routes/AddCheckIn';
import MapPage from './routes/MapPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MapPage />} />
      <Route path='check-in' element={<AddCheckIn />} />
    </Routes>
  );
};

export default App;
