import { LinearInterpolator, WebMercatorViewport } from 'react-map-gl';
import linestring from 'turf-linestring';
import bbox from '@turf/bbox';

const useCentreMap = () => {
  const centreMap = (locations, setSelectedMarker, viewport, setViewport) => {
    setSelectedMarker(null);
    if (locations) {
      const coordinates = locations.map(location => [location.longitude, location.latitude]);
      const line = linestring(coordinates);
      const [minLng, minLat, maxLng, maxLat] = bbox(line);

      const vp = new WebMercatorViewport(viewport);

      const { longitude, latitude, zoom } = vp.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 40,
        }
      );

      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: 2000,
      });
    }
  };

  return centreMap;
};

export default useCentreMap;
