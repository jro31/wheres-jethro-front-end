import { Fragment } from 'react';
import LocationCard from './LocationCard';

const CheckIns = props => {
  return (
    <Fragment>
      {props.checkInLocations &&
        props.checkInLocations.map((location, index) => (
          <LocationCard
            key={location.id}
            location={location}
            index={index}
            selected={props.selectedMarker && props.selectedMarker.id === location.id}
            setSelectedMarker={props.setSelectedMarker}
            viewport={props.viewport}
            setViewport={props.setViewport}
            setDisplayCheckIns={props.setDisplayCheckIns}
          />
        ))}
    </Fragment>
    // TODO - The API should return the last (20?) check-ins by default and position the map accordingly
    // After the last check-in, there should be a "Show archived check-ins" button, which loads all check-ins
    // and centres the map accordingly
  );
};

export default CheckIns;
