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

      console.log('🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮');
      console.log(viewport);
      console.log(typeof viewport.latitude);
      console.log(minLng);
      console.log(typeof minLng);
      console.log(minLat);
      console.log(maxLng);
      console.log(maxLat);

      const vp = new WebMercatorViewport(viewport);

      const { longitude, latitude, zoom } = vp.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 0,
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
