// TODO - Update readme

import { Routes, Route } from 'react-router-dom';

import MapPage from './routes/MapPage';
import AddCheckIn from './routes/AddCheckIn';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MapPage />} />
      <Route path='check-in' element={<AddCheckIn />} />
    </Routes>
  );
};

export default App;
