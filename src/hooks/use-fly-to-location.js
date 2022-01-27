import { FlyToInterpolator } from 'react-map-gl';

const useFlyToLocation = () => {
  const flyToLocation = (location, viewport, setViewport) => {
    setViewport({
      ...viewport,
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  return flyToLocation;
};

export default useFlyToLocation;
